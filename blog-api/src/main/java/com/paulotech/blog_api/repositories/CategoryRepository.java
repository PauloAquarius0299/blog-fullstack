package com.paulotech.blog_api.repositories;

import com.paulotech.blog_api.domain.entities.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Categories, UUID> {

    @Query("SELECT c FROM Categories c LEFT JOIN FETCH c.posts")
    List<Categories> findAllWithPostCount();

    boolean existsByNameIgnoreCase(String name);

}
