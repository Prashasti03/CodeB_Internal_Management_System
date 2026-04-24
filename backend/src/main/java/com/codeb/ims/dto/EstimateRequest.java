package com.codeb.ims.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EstimateRequest {

    private Long chainId;
    private String chainName;

    private String groupName;
    private String brandName;
    private String zoneName;

    private String service;
    private Integer qty;
    private Double costPerUnit;

    private LocalDate deliveryDate;
    private String deliveryDetails;
}