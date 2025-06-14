package com.karan.restaurant.review.system.serviceImpl;

import com.karan.restaurant.review.system.exception.CategoryNotFoundException;
import com.karan.restaurant.review.system.model.Category;
import com.karan.restaurant.review.system.model.Restaurant;
import com.karan.restaurant.review.system.repository.CategoryRepository;
import com.karan.restaurant.review.system.repository.RestaurantRepository;
import com.karan.restaurant.review.system.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    public Category addCategory(Category category) {
        // Fetch only actual restaurant entities from DB using the IDs provided
        List<Restaurant> restaurantList = category.getRestaurants().stream()
                .map(r -> restaurantRepository.findById(r.getId())
                        .orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + r.getId())))
                .toList();

        // Set back-reference for bi-directional mapping
        for (Restaurant restaurant : restaurantList) {
            restaurant.setCategory(category);
        }

        category.setRestaurants(restaurantList);

        return categoryRepository.save(category);
    }


    @Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Category not found"));
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setImageUrl(category.getImageUrl());
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        // Unlink each restaurant from the category
        if (category.getRestaurants() != null) {
            for (Restaurant restaurant : category.getRestaurants()) {
                restaurant.setCategory(null);
            }
        }

        // Now delete the category safely
        categoryRepository.delete(category);
    }
    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Category not found"));

    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }
}
