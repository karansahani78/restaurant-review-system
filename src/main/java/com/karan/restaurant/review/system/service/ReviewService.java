package com.karan.restaurant.review.system.service;

import com.karan.restaurant.review.system.model.Category;
import com.karan.restaurant.review.system.model.Review;

import java.util.List;

public interface ReviewService {
    public Review addReview(Review review, String restaurantId, String userId);
    public Review updateReview(Long id, Review review);
    public void deleteReview(Long id);
    public Review getReviewById(Long id);
    public List<Review> getAllReviews();
}
