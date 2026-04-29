package com.codeb.ims.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chains")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Chain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chainId;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false, unique = true, length = 15)
    private String gstnNo;

    private Boolean isActive = true;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // relation with group
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}