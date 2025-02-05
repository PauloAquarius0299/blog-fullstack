package com.paulotech.blog_api.repositories;

import com.paulotech.blog_api.domain.PostStatus;
import com.paulotech.blog_api.domain.entities.Categories;
import com.paulotech.blog_api.domain.entities.Post;
import com.paulotech.blog_api.domain.entities.Tag;
import com.paulotech.blog_api.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findAllByStatusAndCategoryAndTagsContaining(PostStatus status, Categories category, Tag tags);
    List<Post> findAllByStatusAndCategory(PostStatus status, Categories category);
    List<Post> findByStatusAndTagsContaining(PostStatus status, Tag tags);
    List<Post> findAllByStatus(PostStatus status);
    List<Post> findAllByAuthorAndStatus(User author, PostStatus status);
}