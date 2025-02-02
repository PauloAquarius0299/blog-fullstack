package com.paulotech.blog_api.services.impl;

import com.paulotech.blog_api.domain.entities.Categories;
import com.paulotech.blog_api.repositories.CategoryRepository;
import com.paulotech.blog_api.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl  implements CategoryService {

    private final CategoryRepository repository;

    @Override
    public List<Categories> listCategories() {
        return repository.findAllWithPostCount();
    }

    @Override
    @Transactional
    public Categories createCategory(Categories categories) {
       if(repository.existsByNameIgnoreCase(categories.getName())){
           throw new IllegalArgumentException("Já existe uma cataegoria com esse nome:" + categories.getName());
       }
       return repository.save(categories);
    }

    @Override
    public void deleteCategory(UUID id) {
        Optional<Categories> category = repository.findById(id);
        if(category.isPresent()){
            if(!category.get().getPosts().isEmpty()){
                throw new IllegalArgumentException("Categoria não pode ser deletada, pois possui posts associados");
            }
            repository.deleteById(id);
        }
    }
}