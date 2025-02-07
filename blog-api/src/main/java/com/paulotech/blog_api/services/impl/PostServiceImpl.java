package com.paulotech.blog_api.services.impl;


import com.paulotech.blog_api.domain.CreatePostRequest;
import com.paulotech.blog_api.domain.PostStatus;
import com.paulotech.blog_api.domain.UpdatePostRequest;
import com.paulotech.blog_api.domain.entities.Categories;
import com.paulotech.blog_api.domain.entities.Post;
import com.paulotech.blog_api.domain.entities.Tag;
import com.paulotech.blog_api.domain.entities.User;
import com.paulotech.blog_api.repositories.PostRepository;
import com.paulotech.blog_api.services.CategoryService;
import com.paulotech.blog_api.services.PostsService;
import com.paulotech.blog_api.services.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostsService {

    private final PostRepository postRepository;
    private final CategoryService categoryService;
    private final TagService tagService;

    private static final int WORDS_PER_MINUTE = 200;

    @Override
    public Post getPost(UUID id) {
        return postRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Post not found with ID" + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getAllPosts(UUID categoryId, UUID tagId) {
        if(categoryId != null && tagId != null){
            Categories categories = categoryService.getCategoryById(categoryId);
            Tag tags = tagService.getTagById(tagId);
            return postRepository.findAllByStatusAndCategoryAndTagsContaining(
                    PostStatus.PUBLISHED,
                    categories,
                    tags
            );

        }
        if(categoryId !=null){
            Categories categories = categoryService.getCategoryById(categoryId);
            return postRepository.findAllByStatusAndCategory(
                    PostStatus.PUBLISHED,
                    categories
            );
        }
        if(tagId != null){
            Tag tags = tagService.getTagById(tagId);
            return postRepository.findByStatusAndTagsContaining(
                    PostStatus.PUBLISHED,
                    tags
            );
        }
        return postRepository.findAllByStatus(PostStatus.PUBLISHED);

    }

    @Override
    public List<Post> getDraftsPosts(User user) {
        return postRepository.findAllByAuthorAndStatus(user, PostStatus.DRAFT);
    }

    @Override
    @Transactional
    public Post createPost(User user, CreatePostRequest createPostRequest) {
        Post newPost = new Post();
        newPost.setTitle(createPostRequest.getTitle());
        newPost.setContent(createPostRequest.getContent());
        newPost.setStatus(createPostRequest.getStatus());
        newPost.setAuthor(user);
        newPost.setReadingTime(calculateReadingTime(createPostRequest.getContent()));

        Categories category = categoryService.getCategoryById(createPostRequest.getCategoryId());
        newPost.setCategory(category);

        Set<UUID> tagIds = createPostRequest.getTagIds();
        List<Tag> tags = tagService.getTagsByIds(tagIds);
        newPost.setTags(new HashSet<>(tags));

        return postRepository.save(newPost);
    }

    @Override
    @Transactional
    public Post updatePost(UUID id, UpdatePostRequest updatePostRequest) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Post not found with ID" + id));

        existingPost.setTitle(updatePostRequest.getTitle());
        existingPost.setContent(updatePostRequest.getContent());
        existingPost.setStatus(updatePostRequest.getPostStatus());
        existingPost.setReadingTime(calculateReadingTime(updatePostRequest.getContent()));

        UUID updatePostRequestCategoryId = updatePostRequest.getCategoryId();
        if(!existingPost.getCategory().getId().equals(updatePostRequestCategoryId)){
            Categories newCategory = categoryService.getCategoryById(updatePostRequestCategoryId);
            existingPost.setCategory(newCategory);
        }

        Set<UUID> existingTagIds = existingPost.getTags().stream()
                .map(Tag::getId)
                .collect(java.util.stream.Collectors.toSet());
        Set<UUID> updatePostRequestTagIds = updatePostRequest.getTagsIds();
        if(!existingTagIds.equals(updatePostRequestTagIds)){
            List<Tag> newTags = tagService.getTagsByIds(updatePostRequestTagIds);
            existingPost.setTags(new HashSet<>(newTags));
        }

        return postRepository.save(existingPost);
    }

    @Override
    public void deletePost(UUID id) {
        Post post = getPost(id);
        postRepository.delete(post);
    }

    private Integer calculateReadingTime(String content) {
        if(content == null || content.isEmpty()){
            return 0;
        }
        int wordCount = content.trim().split("\\s+").length;
        return (int) Math.ceil((double)wordCount / WORDS_PER_MINUTE);
    }
}
