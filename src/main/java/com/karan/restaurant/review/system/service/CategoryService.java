package com.karan.restaurant.review.system.service;

import com.karan.restaurant.review.system.model.Category;
import org.springframework.data.querydsl.QPageRequest;

import java.util.List;

public interface CategoryService {
    public Category addCategory(Category category);
    public Category updateCategory(Long id, Category category);
    public Category deleteCategory(Long id);
    public Category getCategoryById(Long id);
    public List<Category> getAllCategories();
}
