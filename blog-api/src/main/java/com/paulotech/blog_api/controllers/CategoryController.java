package com.paulotech.blog_api.controllers;

import com.paulotech.blog_api.domain.dto.CategoryDTO;
import com.paulotech.blog_api.domain.dto.CreateCategoryRequest;
import com.paulotech.blog_api.domain.entities.Categories;
import com.paulotech.blog_api.mappers.CategoryMapper;
import com.paulotech.blog_api.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(path = "api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;
    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> listCategories(){
        List<CategoryDTO> categories = service.listCategories()
                .stream()
                .map(categoryMapper::toDto)
                .toList();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(
            @Valid @RequestBody CreateCategoryRequest createCategoryRequest){
        Categories categoryToCreate = categoryMapper.toEntities(createCategoryRequest);
        Categories savedCategory = service.createCategory(categoryToCreate);
        return new ResponseEntity<>(categoryMapper.toDto(savedCategory),
                HttpStatus.CREATED
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id){
        service.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
