package com.karan.restaurant.review.system.controller;

import com.karan.restaurant.review.system.model.Restaurant;
import com.karan.restaurant.review.system.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    // Fixed endpoint → categoryId is now part of the URI
    @PostMapping("/add/{categoryId}")
    public ResponseEntity<Restaurant> addRestaurant(
            @RequestBody Restaurant input,
            @PathVariable Long categoryId) {

        Restaurant savedRestaurant = restaurantService.addRestaurant(input, categoryId);
        return ResponseEntity.status(201).body(savedRestaurant);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.status(200).body(restaurant);
    }
    @GetMapping
    public ResponseEntity<Iterable<Restaurant>> getAllRestaurants() {
        Iterable<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.status(200).body(restaurants);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurant) {
        Restaurant updatedRestaurant = restaurantService.updateRestaurant(id, restaurant);
        return ResponseEntity.status(200).body(updatedRestaurant);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.status(204).build();
    }
}
