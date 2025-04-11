package com.shoeapp.controller;

import com.shoeapp.dto.request.LoginRequest;
import com.shoeapp.dto.request.SignupRequest;
import com.shoeapp.dto.response.JwtResponse;
import com.shoeapp.dto.response.SignupResponse;
import com.shoeapp.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        log.info("Login request for user: {}", loginRequest.getUsername());
        JwtResponse jwtResponse = authService.login(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest signupRequest) {
        log.info("Signup request for user: {}", signupRequest.getUsername());
        SignupResponse signupResponse = authService.register(signupRequest);
        return ResponseEntity.ok(signupResponse);
    }

    @PostMapping("/create-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SignupResponse> createAdmin(@Valid @RequestBody SignupRequest signupRequest) {
        log.info("Creating new admin user: {}", signupRequest.getUsername());
        // Force the role to be ROLE_ADMIN
        signupRequest.setRole("ROLE_ADMIN");
        SignupResponse signupResponse = authService.register(signupRequest);
        return ResponseEntity.ok(signupResponse);
    }
}