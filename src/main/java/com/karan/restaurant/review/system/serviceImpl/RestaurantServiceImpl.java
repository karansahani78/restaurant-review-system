package com.karan.restaurant.review.system.serviceImpl;

import com.karan.restaurant.review.system.exception.CategoryNotFoundException;
import com.karan.restaurant.review.system.model.*;
import com.karan.restaurant.review.system.repository.CategoryRepository;
import com.karan.restaurant.review.system.repository.RestaurantRepository;
import com.karan.restaurant.review.system.repository.ReviewRepository;
import com.karan.restaurant.review.system.repository.UserRepository;
import com.karan.restaurant.review.system.service.CategoryService;
import com.karan.restaurant.review.system.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final CategoryRepository categoryRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public Restaurant addRestaurant(Restaurant input, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("Category not found"));
        Restaurant restaurant = new Restaurant();
        restaurant.setCategory(category);
        restaurant.setName(input.getName());
        restaurant.setDescription(input.getDescription());
        restaurant.setEmail(input.getEmail());

        // Set default opening hours for the full week
        List<OpeningHour> openingHours = Arrays.stream(DayOfWeek.values())
                .map(day -> OpeningHour.builder()
                        .day(day)
                        .openTime("09:00 AM")
                        .closeTime("10:00 PM")
                        .build())
                .toList();
        restaurant.setOpeningHours(openingHours);

        restaurant.setImageUrl(input.getImageUrl());
        restaurant.setAddress(input.getAddress());
        restaurant.setCity(input.getCity());
        restaurant.setState(input.getState());
        restaurant.setCountry(input.getCountry());
        restaurant.setPincode(input.getPincode());
        restaurant.setContactNumber(input.getContactNumber());
        restaurant.setCreatedOn(LocalDateTime.now());
        restaurant.setUpdatedOn(LocalDateTime.now());
        restaurant.setCategory(category);
        restaurant.setAverageRating(0.0); // Always start at 0

        List<Review> reviews = input.getReviews() != null ? input.getReviews() : new ArrayList<>();
        for (Review review : reviews) {
            review.setRestaurant(restaurant);
        }
        restaurant.setReviews(reviews);
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {
        Restaurant existingRestaurant = restaurantRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Restaurant not found"));
        existingRestaurant.setName(restaurant.getName());
        existingRestaurant.setDescription(restaurant.getDescription());
        existingRestaurant.setEmail(restaurant.getEmail());
        existingRestaurant.setImageUrl(restaurant.getImageUrl());
        existingRestaurant.setAddress(restaurant.getAddress());
        existingRestaurant.setCity(restaurant.getCity());
        existingRestaurant.setState(restaurant.getState());
        existingRestaurant.setCountry(restaurant.getCountry());
        existingRestaurant.setPincode(restaurant.getPincode());
        existingRestaurant.setContactNumber(restaurant.getContactNumber());
        existingRestaurant.setUpdatedOn(LocalDateTime.now());
        existingRestaurant.setOpeningHours(restaurant.getOpeningHours());
        existingRestaurant.setReviews(restaurant.getReviews());
        existingRestaurant.setAverageRating(restaurant.getAverageRating());
        if (restaurant.getCategory() != null) {
            Category category = categoryRepository.findById(restaurant.getCategory().getId())
                    .orElseThrow(() -> new CategoryNotFoundException("Category not found"));
            existingRestaurant.setCategory(category);
        }
        return restaurantRepository.save(existingRestaurant);

    }

    @Override
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Restaurant not found"));
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);

    }
}