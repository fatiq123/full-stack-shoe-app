package com.shoeapp.service;

import com.shoeapp.dto.request.LoginRequest;
import com.shoeapp.dto.request.SignupRequest;
import com.shoeapp.dto.response.JwtResponse;
import com.shoeapp.dto.response.SignupResponse;

public interface AuthService {
    public JwtResponse login(LoginRequest loginRequest);
    public SignupResponse register(SignupRequest signupRequest);
}
