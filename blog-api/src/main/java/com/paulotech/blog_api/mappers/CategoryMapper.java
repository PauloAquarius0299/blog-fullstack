package com.paulotech.blog_api.mappers;

import com.paulotech.blog_api.domain.PostStatus;
import com.paulotech.blog_api.domain.dto.CategoryDTO;
import com.paulotech.blog_api.domain.dto.CreateCategoryRequest;
import com.paulotech.blog_api.domain.entities.Categories;
import com.paulotech.blog_api.domain.entities.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

    @Mapping(target = "postCount", source = "posts", qualifiedByName = "calculateCountPosts")
    CategoryDTO toDto(Categories categories);

    Categories toEntities(CreateCategoryRequest categoryRequest);

    @Named("calculateCountPosts")
    default long calculateCountPosts(List<Post> posts) {
        if(null == posts){
            return 0;
        }
        return posts.stream().filter(post -> PostStatus.PUBLISHED.equals(post.getStatus())).count();
    }
}
