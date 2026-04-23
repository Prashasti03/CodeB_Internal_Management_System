package com.codeb.ims.service;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

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

            message.setFrom("dhanorkarprashasti@gmail.com");

            mailSender.send(message);

            System.out.println("Email sent successfully to: " + to);

        } catch (Exception e) {
            System.out.println("❌ Email sending failed!");
            e.printStackTrace(); // VERY IMPORTANT for Render logs
        }
    }

    public void sendResetEmail(String toEmail, String token) {

        try {
            // String link =
            // "https://idyllic-pastelito-b100f6.netlify.app/reset-password?token=" + token;
            String link = "https://code-b-internal-management-system.vercel.app/reset-password?token=" + token;

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

    public void sendEmailWithAttachment(String to, String subject, String text, byte[] pdf) {

    try {
        System.out.println("2. Sending email with attachment to: " + to);

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);

        // VERY IMPORTANT
        helper.setFrom("dhanorkarprashasti@gmail.com");

        helper.addAttachment("invoice.pdf", new ByteArrayResource(pdf));

        mailSender.send(message);

        System.out.println("3. ✅ Email with attachment sent successfully!");

    } catch (Exception e) {
        System.out.println("3. ❌ Email with attachment FAILED!");
        e.printStackTrace(); // CHECK RENDER LOGS
    }
}
}