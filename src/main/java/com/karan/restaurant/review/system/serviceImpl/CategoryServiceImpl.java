package com.karan.restaurant.review.system.serviceImpl;

import com.karan.restaurant.review.system.exception.CategoryNotFoundException;
import com.karan.restaurant.review.system.model.Category;
import com.karan.restaurant.review.system.model.Restaurant;
import com.karan.restaurant.review.system.repository.CategoryRepository;
import com.karan.restaurant.review.system.repository.RestaurantRepository;
import com.karan.restaurant.review.system.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    @CacheEvict(value = "categories", allEntries = true)
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
    @CachePut(value = "categories", key = "#id")
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Category not found"));
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setImageUrl(category.getImageUrl());
        return categoryRepository.save(existingCategory);
    }

    @Override
    @CacheEvict(value = "categories", key = "#id")
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
    @Cacheable(value = "categories", key = "#id")
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Category not found"));

    }

    @Override
    @Cacheable(value = "categoriesList")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Cacheable(value = "categoriesByName", key = "#name", unless = "#result == null")
    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }
}
