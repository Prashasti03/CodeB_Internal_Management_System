package com.codeb.ims.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class EstimateResponse {

    private Long estimatedId;
    private Long chainId;
    private String chainName;

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
}