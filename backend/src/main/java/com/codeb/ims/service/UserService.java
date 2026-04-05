package com.codeb.ims.service;

import com.codeb.ims.dto.LoginRequest;
import com.codeb.ims.dto.RegisterRequest;

public interface UserService {

    String registerUser(RegisterRequest request);

    String loginUser(LoginRequest request);

    void verifyUser(String token);

    void forgotPassword(String email);

    void resetPassword(String token, String newPassword);
}

// User user = userRepository.findByVerificationToken(token)
// .orElseThrow(() -> new RuntimeException("Invalid token"));

// user.setVerified(true);
// user.setVerificationToken(null);

// userRepository.save(user);