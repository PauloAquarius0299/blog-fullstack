package com.paulotech.blog_api.services;


import com.paulotech.blog_api.domain.entities.Tag;


import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TagService {
    List<Tag> getTags();
    List<Tag> createTags(Set<String> tagNames);
    void deleteTag(UUID id);
}
