package com.codeb.ims.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long brandId;

    @Column(nullable = false, length = 50)
    private String brandName;

    @ManyToOne
    @JoinColumn(name = "chain_id", nullable = false)
    private Chain chain;

    private Boolean isActive = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}