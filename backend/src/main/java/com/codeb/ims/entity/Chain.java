package com.ims.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

// This class represents the 'chain' table in MySQL database.
// Each chain/company belongs to a group and has a unique GSTN number.

@Entity
@Table(name = "chain")
public class Chain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chain_id")
    private Integer chainId;

    @Column(name = "company_name", nullable = false, length = 255)
    private String companyName;

    // GSTN must be unique across all chains - enforced at DB level too
    @Column(name = "gstn_no", nullable = false, unique = true, length = 15)
    private String gstnNo;

    // Soft delete: true = active (visible), false = deleted (hidden)
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Many chains can belong to one group
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    // Automatically set timestamps before saving/updating
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ---- Getters and Setters ----

    public Integer getChainId() { return chainId; }
    public void setChainId(Integer chainId) { this.chainId = chainId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getGstnNo() { return gstnNo; }
    public void setGstnNo(String gstnNo) { this.gstnNo = gstnNo; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Group getGroup() { return group; }
    public void setGroup(Group group) { this.group = group; }
}