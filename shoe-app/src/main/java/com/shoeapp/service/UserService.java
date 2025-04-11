package com.shoeapp.service;

import com.shoeapp.dto.response.UserResponse;

public interface UserService {
    public UserResponse getUserById(Long id);
    public UserResponse getUserByUsername(String username);

}
