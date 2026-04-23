package com.codeb.ims.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer invoiceNo;

    private Long estimatedId;
    private Long chainId;

    private String serviceDetails;

    private Integer qty;
    private Double costPerQty;
    private Double amountPayable;
    private Double balance;

    private LocalDateTime dateOfPayment;
    private LocalDate dateOfService;

    private String deliveryDetails;
    private String emailId;
}