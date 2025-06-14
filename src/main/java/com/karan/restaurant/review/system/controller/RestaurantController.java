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
}
