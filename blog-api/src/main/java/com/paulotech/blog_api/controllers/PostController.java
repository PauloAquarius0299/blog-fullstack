package com.paulotech.blog_api.controllers;

import com.paulotech.blog_api.domain.CreatePostRequest;
import com.paulotech.blog_api.domain.dto.CreatePostRequestDto;
import com.paulotech.blog_api.domain.dto.PostDto;
import com.paulotech.blog_api.domain.entities.Post;
import com.paulotech.blog_api.domain.entities.User;
import com.paulotech.blog_api.mappers.PostMapper;
import com.paulotech.blog_api.services.PostsService;
import com.paulotech.blog_api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostsService postsService;
    private final PostMapper postMapper;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(
            @RequestParam(required = false)UUID categoryId,
            @RequestParam(required = false) UUID tagId
            ){
        List<Post> posts = postsService.getAllPosts(categoryId, tagId);
        List<PostDto> postDtos = posts.stream().map(postMapper::toDto).toList();
        return ResponseEntity.ok(postDtos);
    }

    @GetMapping(path = "/drafts")
    public ResponseEntity<List<PostDto>> getDrafts(@RequestAttribute UUID userId) {
        User loggedInUser = userService.getUserById(userId);
        List<Post> draftPosts = postsService.getDraftsPosts(loggedInUser);
        List<PostDto> postDto = draftPosts.stream().map(postMapper::toDto).toList();
        return ResponseEntity.ok(postDto);
    }

    @PostMapping
    public ResponseEntity<PostDto> createPosts(
            @RequestBody CreatePostRequestDto createPostRequestDto,
            @RequestAttribute UUID userId){
        User loggedInUser = userService.getUserById(userId);
        CreatePostRequest createPostRequest = postMapper.toCreatePostRequest(createPostRequestDto);
        Post createdPost = postsService.createPost(loggedInUser, createPostRequest);
        PostDto createdPostDto = postMapper.toDto(createdPost);
        return new ResponseEntity<>(createdPostDto, HttpStatus.CREATED);
    }

}
