package com.paulotech.blog_api.services;

import com.paulotech.blog_api.domain.CreatePostRequest;
import com.paulotech.blog_api.domain.UpdatePostRequest;
import com.paulotech.blog_api.domain.entities.Post;
import com.paulotech.blog_api.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PostsService {
    List<Post> getAllPosts(UUID categoryId, UUID tagId);
    List<Post> getDraftsPosts(User user);
    Post createPost(User user, CreatePostRequest createPostRequest);
    Post updatePost(UUID id, UpdatePostRequest updatePostRequest);
}
