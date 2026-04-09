package com.codeb.ims.service.impl;

import com.codeb.ims.dto.RegisterRequest;
import com.codeb.ims.dto.LoginRequest;
import com.codeb.ims.entity.User;
import com.codeb.ims.repository.UserRepository;
import com.codeb.ims.security.JwtUtil;
import com.codeb.ims.service.EmailService;
import com.codeb.ims.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    @Override
    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        String token = UUID.randomUUID().toString();

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .status(User.Status.active)
                .verificationToken(token)
                .isVerified(false)
                .build();

        userRepository.save(user);

        // ✅ FIXED LINK (NO "...")
        // String link = "https://codeb-internal-management-system.onrender.com/api/auth/verify?token=" + token;

        // OR frontend route (if you handle verification there)
        String link = "https://idyllic-pastelito-b100f6.netlify.app/verify?token=" + token;

        System.out.println("Verification link: " + link);

        emailService.sendEmail(
                user.getEmail(),
                "Verify your account",
                "Click here to verify your account:\n" + link
        );

        return "User Registered. Please verify email.";
    }

    @Override
    public String loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email first");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

    @Override
    public void verifyUser(String token) {

        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        user.setVerified(true);
        user.setVerificationToken(null);

        userRepository.save(user);

        System.out.println("User verified: " + user.getEmail());
    }

    @Override
    public void forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);

        userRepository.save(user);

        emailService.sendResetEmail(user.getEmail(), token);
    }

    @Override
    public void resetPassword(String token, String newPassword) {

        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setResetToken(null);

        userRepository.save(user);
    }
}