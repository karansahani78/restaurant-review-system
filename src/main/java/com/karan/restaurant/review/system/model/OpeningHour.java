package com.karan.restaurant.review.system.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpeningHour {

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Day is required")
    private DayOfWeek day;

    @NotBlank(message = "Open time is required")
    private String openTime;

    @NotBlank(message = "Close time is required")
    private String closeTime;
}
