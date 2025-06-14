package com.karan.restaurant.review.system.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "category_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // e.g., Italian, Indian, Chinese
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Restaurant> restaurants;
}
