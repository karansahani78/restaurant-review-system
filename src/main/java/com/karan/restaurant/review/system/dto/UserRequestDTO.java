package com.karan.restaurant.review.system.dto;

import com.karan.restaurant.review.system.model.Review;
import com.karan.restaurant.review.system.model.Role;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {
    private String name;
    private String email;
    private String password;
    private Role role;
    private List<Review> reviews;
}
