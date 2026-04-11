package com.codeb.ims.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

@Component
public class JwtUtil {

    // private final Key SECRET_KEY =
    // "my_super_secret_key_which_is_very_long_123456789";
    // private final Key SECRET_KEY = ${SECRET_KEY};

    @Value("${SECRET_KEY}")
    private String SECRET_KEY;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                // .signWith(SECRET_KEY)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
                System.out.println("SECRET KEY: " + SECRET_KEY);
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRole(String token) {

        Claims claims = Jwts.parserBuilder()
                // .setSigningKey(getSignKey())
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("role", String.class);
    }

    public boolean validateToken(String token, String email) {

        String extractedEmail = extractEmail(token);
        return extractedEmail.equals(email);
    }
}