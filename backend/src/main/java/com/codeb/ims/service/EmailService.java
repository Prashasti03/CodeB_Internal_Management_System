package com.codeb.ims.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body, String text) {

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            message.setFrom("dhanorkarprashasti@gmail.com"); // Must match your SMTP username

            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
            throw new RuntimeException("Email sending failed: " + e.getMessage());
        }
    }

    public void sendResetEmail(String toEmail, String token) {
        // SimpleMailMessage message = new SimpleMailMessage();
        // message.setTo(toEmail);
        // message.setSubject("Reset Password");

        // message.setText(
        // "Click to reset password:\n" +
        // "https://idyllic-pastelito-b100f6.netlify.app/reset-password?token=..." +
        // token);

        // mailSender.send(message);
        String resetLink = "https://idyllic-pastelito-b100f6.netlify.app/reset-password?token=" + token;
        String text = "Click here to reset your password: " + resetLink;
        sendEmail(to, "Password Reset Request", text);
    }
}