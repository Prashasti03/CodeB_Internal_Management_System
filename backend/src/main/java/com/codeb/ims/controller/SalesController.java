package com.codeb.ims.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sales")
public class SalesController {
    @GetMapping("/dashboard")
    public String salesDashboard() {
        return "Welcome Sales User";
    }
}
