package com.paulotech.blog_api.services;

import com.paulotech.blog_api.domain.entities.Categories;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    List<Categories> listCategories();
    Categories createCategory(Categories categories);
    void deleteCategory(UUID id);
}
