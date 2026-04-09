package com.codeb.ims.controller;

import com.codeb.ims.dto.ForgotPasswordRequest;
import com.codeb.ims.dto.LoginRequest;
import com.codeb.ims.dto.RegisterRequest;
import com.codeb.ims.dto.ResetPasswordRequest;
import com.codeb.ims.service.UserService;
import com.codeb.ims.service.impl.UserServiceImpl;
import com.codeb.ims.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.codeb.ims.entity.User;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }

    @GetMapping("/test")
    public String test() {
        return "Auth working";
    }

    @GetMapping("/verify")
    public String verifyUser(@RequestParam String token) {
        userService.verifyUser(token);
        return "Email verified successfully";
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody ForgotPasswordRequest request) {
        userService.forgotPassword(request.getEmail());
        return "Reset link sent to email";
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getToken(), request.getNewPassword());
        return "Password reset successful";
    }

    @PostMapping("/test-email")
    public String testEmail(@RequestParam String email) {
        try {
            emailService.sendEmail(email, "Test Email", "This is a test email from your app");
            return "Email sent successfully to " + email;
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
}