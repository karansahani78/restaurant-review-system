package com.karan.restaurant.review.system;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.Caching;

@SpringBootApplication
@Caching
public class RestaurantReviewSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestaurantReviewSystemApplication.class, args);
	}


}
