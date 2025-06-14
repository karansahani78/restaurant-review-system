package com.karan.restaurant.review.system.repository;

import com.karan.restaurant.review.system.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    public Optional<Category> findByName(String name);
}
