package com.karan.restaurant.review.system.service;

import com.karan.restaurant.review.system.dto.UserRequestDTO;
import com.karan.restaurant.review.system.dto.UserResponseDTO;

import java.util.List;
public interface UserService {
    // create a new user
    public UserResponseDTO createUser(UserRequestDTO userRequestDTO);
    // get user by id
    public UserResponseDTO getUserById(Long id);
    // get all users
    public List<UserResponseDTO> getAllUsers();
    // update user by id
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDT0);
    // delete user by id
    public void deleteUser(Long id);
}
