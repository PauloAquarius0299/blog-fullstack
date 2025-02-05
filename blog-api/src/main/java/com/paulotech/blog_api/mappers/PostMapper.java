package com.paulotech.blog_api.mappers;

import com.paulotech.blog_api.domain.CreatePostRequest;
import com.paulotech.blog_api.domain.dto.CreatePostRequestDto;
import com.paulotech.blog_api.domain.dto.PostDto;
import com.paulotech.blog_api.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "author", source = "author")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    PostDto toDto(Post post);
    CreatePostRequest toCreatePostRequest(CreatePostRequestDto post);
}
