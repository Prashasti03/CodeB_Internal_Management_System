package com.codeb.ims.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "estimates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Estimate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long estimatedId;

    private Long chainId;

    private String groupName;
    private String brandName;
    private String zoneName;

    private String service;
    private Integer qty;
    private Double costPerUnit;
    private Double totalCost;

    private LocalDate deliveryDate;
    private String deliveryDetails;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}