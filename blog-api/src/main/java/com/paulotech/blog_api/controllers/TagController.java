package com.paulotech.blog_api.controllers;

import com.paulotech.blog_api.domain.dto.CreateTagRequest;
import com.paulotech.blog_api.domain.dto.TagResponse;
import com.paulotech.blog_api.domain.entities.Tag;
import com.paulotech.blog_api.mappers.TagMapper;
import com.paulotech.blog_api.services.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/v1/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;
    private final TagMapper tagMapper;

    @GetMapping
    public ResponseEntity<List<TagResponse>> getAllTags(){
        List<Tag> tags = tagService.getTags();
        List<TagResponse> tagResponses = tags.stream().map(tagMapper::toTagResponse).toList();
        return ResponseEntity.ok(tagResponses);
    }

    @PostMapping
    public ResponseEntity<List<TagResponse>> createTags(@Valid @RequestBody CreateTagRequest createTagRequest) {
        Set<String> tagNames = createTagRequest.getNames().stream()
                .map(CreateTagRequest.TagName::getName)
                .collect(Collectors.toSet());
        List<Tag> savedTags = tagService.createTags(tagNames);
        List<TagResponse> createdTagsResponses = savedTags.stream().map(tagMapper::toTagResponse).collect(Collectors.toList());

        return new ResponseEntity<>(createdTagsResponses, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable UUID id){
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }

}