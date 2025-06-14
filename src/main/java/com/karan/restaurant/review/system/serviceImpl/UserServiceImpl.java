package com.karan.restaurant.review.system.serviceImpl;

import com.karan.restaurant.review.system.dto.UserRequestDTO;
import com.karan.restaurant.review.system.dto.UserResponseDTO;
import com.karan.restaurant.review.system.exception.UserNotFoundException;
import com.karan.restaurant.review.system.model.User;
import com.karan.restaurant.review.system.repository.UserRepository;
import com.karan.restaurant.review.system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    public UserResponseDTO createUser(UserRequestDTO userRequestDT0) {
        User user = User.builder()
                .name(userRequestDT0.getName())
                .email(userRequestDT0.getEmail())
                .password(userRequestDT0.getPassword())
                .role(userRequestDT0.getRole())
                .reviews(userRequestDT0.getReviews())
                .build();
        User savedUser = userRepository.save(user);
        // Convert User to UserResponseDTO
        return UserResponseDTO.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .role(savedUser.getRole())
                .reviews(savedUser.getReviews())
                .build();
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .reviews(user.getReviews())
                .build();
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserResponseDTO.builder()
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .reviews(user.getReviews())
                        .id(user.getId())
                        .build()).collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDT0) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        existingUser.setName(userRequestDT0.getName());
        existingUser.setEmail(userRequestDT0.getEmail());
        existingUser.setPassword(userRequestDT0.getPassword());
        existingUser.setRole(userRequestDT0.getRole());
        existingUser.setReviews(userRequestDT0.getReviews());
        User updatedUser = userRepository.save(existingUser);
        // returning updated user as UserResponseDTO
        return UserResponseDTO.builder()
                .id(updatedUser.getId())
                .name(updatedUser.getName())
                .email(updatedUser.getEmail())
                .role(updatedUser.getRole())
                .reviews(updatedUser.getReviews())
                .build();
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        userRepository.delete(user);


    }
}
