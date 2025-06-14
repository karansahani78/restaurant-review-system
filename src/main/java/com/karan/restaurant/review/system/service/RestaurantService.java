package com.karan.restaurant.review.system.service;

import com.karan.restaurant.review.system.model.Restaurant;

import java.util.List;

public interface RestaurantService {
    // Define methods for restaurant-related operations
    public Restaurant addRestaurant(Restaurant restaurant);
    public Restaurant updateRestaurant(Long id, Restaurant restaurant);
    public Restaurant getRestaurantById(Long id);
    public List<Restaurant> getAllRestaurants();
    public void deleteRestaurant(Long id);
}
