package com.karan.restaurant.review.system.service;

import com.karan.restaurant.review.system.model.Category;

public interface ReviewService {
    public Category addReview(Category category);
    public Category updateReview(Long id, Category category);
    public Category deleteReview(Long id);
    public Category getReviewById(Long id);
    public Category getAllReviews();
}
