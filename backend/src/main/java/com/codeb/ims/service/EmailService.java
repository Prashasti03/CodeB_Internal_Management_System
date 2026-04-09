package com.codeb.ims.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // Original method with 3 parameters
    public void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            message.setFrom("dhanorkarprashasti@gmail.com");
            
            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
            throw new RuntimeException("Email sending failed: " + e.getMessage());
        }
    }

    // Method for password reset emails
    public void sendResetEmail(String to, String token) {
        String resetLink = "https://idyllic-pastelito-b100f6.netlify.app/reset-password?token=" + token;
        String text = "Click here to reset your password: " + resetLink;
        sendEmail(to, "Password Reset Request", text);
    }
}