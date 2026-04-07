package com.codeb.ims.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
                        // .allowedOrigins("http://localhost:5173")
                        // .allowedOrigins("https://frontend.netlify.app")
                        .allowedOrigins("https://idyllic-pastelito-b100f6.netlify.app")
                        .allowedOrigins("*")   // use it only during testing
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}