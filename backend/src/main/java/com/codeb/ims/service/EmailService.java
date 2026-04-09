package com.codeb.ims.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {

        try {
            System.out.println("Sending email to: " + to);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            System.out.println("Email sent successfully to: " + to);

        } catch (Exception e) {
            System.out.println("❌ Email sending failed!");
            e.printStackTrace(); // VERY IMPORTANT for Render logs
        }
    }

    public void sendResetEmail(String toEmail, String token) {

        try {
            String link = "https://idyllic-pastelito-b100f6.netlify.app/reset-password?token=" + token;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Reset Password");
            message.setText("Click to reset password:\n" + link);

            mailSender.send(message);

            System.out.println("Reset email sent to: " + toEmail);

        } catch (Exception e) {
            System.out.println("❌ Reset email failed!");
            e.printStackTrace();
        }
    }
}