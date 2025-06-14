package com.karan.restaurant.review.system.serviceImpl;

import com.karan.restaurant.review.system.dto.UserRequestDTO;
import com.karan.restaurant.review.system.exception.RestaurantNotFoundException;
import com.karan.restaurant.review.system.exception.UserNotFoundException;
import com.karan.restaurant.review.system.model.Category;
import com.karan.restaurant.review.system.model.Restaurant;
import com.karan.restaurant.review.system.model.Review;
import com.karan.restaurant.review.system.model.User;
import com.karan.restaurant.review.system.repository.RestaurantRepository;
import com.karan.restaurant.review.system.repository.ReviewRepository;
import com.karan.restaurant.review.system.repository.UserRepository;
import com.karan.restaurant.review.system.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final ReviewRepository reviewRepository;


    @Override
    public Review addReview(Review review, String restaurantId, String userId) {
        User user = userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        Restaurant restaurant = restaurantRepository.findById(Long.parseLong(restaurantId))
                .orElseThrow(() -> new RestaurantNotFoundException("Restaurant not found with id: " + restaurantId));

        // ✅ Validate rating manually
        Integer rating = review.getRating();
        if (rating == null || rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5.");
        }

        Review newReview = new Review();
        newReview.setRating(rating);
        newReview.setComment(review.getComment());
        newReview.setRestaurant(restaurant);
        newReview.setUser(user);

        return reviewRepository.save(newReview);
    }

    @Override
    public Review updateReview(Long id, Review review) {
        return reviewRepository.findById(id)
                .map(existingReview -> {
                    existingReview.setRating(review.getRating());
                    existingReview.setComment(review.getComment());
                    return reviewRepository.save(existingReview);
                })
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }

    @Override
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        reviewRepository.delete(review);
    }

    @Override
    public Review getReviewById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
