package com.shoeapp.service.impl;

import com.shoeapp.dto.request.LoginRequest;
import com.shoeapp.dto.request.SignupRequest;
import com.shoeapp.dto.response.JwtResponse;
import com.shoeapp.dto.response.SignupResponse;
import com.shoeapp.entity.User;
import com.shoeapp.exception.BadRequestException;
import com.shoeapp.repository.UserRepository;
import com.shoeapp.security.JwtTokenProvider;
import com.shoeapp.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public JwtResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new BadRequestException("User not found"));

        log.info("User {} successfully logged in", user.getUsername());

        return new JwtResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    @Transactional
    public SignupResponse register(SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        // Set default role if not provided
        String role = signupRequest.getRole();
        if (role == null || role.isEmpty()) {
            role = "ROLE_USER";
        } else {
            // Validate role
            if (!role.equals("ROLE_USER") && !role.equals("ROLE_ADMIN")) {
                throw new BadRequestException("Invalid role: " + role);
            }
        }

        // Create new user
        User user = User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);
        log.info("User {} successfully registered", user.getUsername());

        userRepository.save(user);
        log.info("User {} successfully registered with role: {}", user.getUsername(), user.getRole());

        return SignupResponse.builder()
                .message("User registered successfully!")
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
