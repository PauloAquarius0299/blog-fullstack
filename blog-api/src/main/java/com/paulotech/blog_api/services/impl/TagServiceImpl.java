package com.paulotech.blog_api.services.impl;

import com.paulotech.blog_api.domain.dto.CreateTagRequest;
import com.paulotech.blog_api.domain.entities.Tag;
import com.paulotech.blog_api.repositories.TagRepository;
import com.paulotech.blog_api.services.TagService;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAllWithPostCount();
    }

    @Transactional
    @Override
    public List<Tag> createTags(Set<String> tagNames) {
        List<Tag> existingTags = tagRepository.findByNameIn(tagNames);
        Set<String> existingTagNames = existingTags.stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());
        List<Tag> newTags = tagNames.stream()
                .filter(name -> !existingTagNames.contains(name))
                .map(name -> Tag.builder()
                        .name(name)
                        .posts(new HashSet<>())
                        .build())
                .toList();

        List<Tag> savedTag = new ArrayList<>();
        if(!newTags.isEmpty()){
            savedTag = tagRepository.saveAll(newTags);
        }

        savedTag.addAll(existingTags);

        return savedTag;
    }

    @Transactional
    @Override
    public void deleteTag(UUID id) {
        tagRepository.findById(id).ifPresent(tag -> {
            if(!tag.getPosts().isEmpty()){
                throw new RuntimeException("Não é possivel deletar a tag do posts");
            }
            tagRepository.deleteById(id);
        });
    }
}
