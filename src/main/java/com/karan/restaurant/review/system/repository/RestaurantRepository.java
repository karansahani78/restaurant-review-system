package com.karan.restaurant.review.system.repository;

import com.karan.restaurant.review.system.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
    public Optional<Restaurant> findByName(String name);
}
