// package com.codeb.ims.entity;

// import jakarta.persistence.*;

// // =====================================================================
// // THIS IS A STUB for the Brand entity (Module 4).
// // You need this NOW so that BrandRepository compiles correctly.
// // When you build the Brand Management module, you'll expand this class.
// // =====================================================================

// @Entity
// @Table(name = "brand")
// public class Brand {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "brand_id")
//     private Integer brandId;

//     @Column(name = "brand_name", nullable = false)
//     private String brandName;

//     // A brand belongs to one chain
//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "chain_id", nullable = false)
//     private Chain chain;

//     // Soft delete flag
//     @Column(name = "is_active")
//     private Boolean isActive = true;

//     // Getters and Setters
//     public Integer getBrandId() { return brandId; }
//     public void setBrandId(Integer brandId) { this.brandId = brandId; }

//     public String getBrandName() { return brandName; }
//     public void setBrandName(String brandName) { this.brandName = brandName; }

//     public Chain getChain() { return chain; }
//     public void setChain(Chain chain) { this.chain = chain; }

//     public Boolean getIsActive() { return isActive; }
//     public void setIsActive(Boolean isActive) { this.isActive = isActive; }
// }

package com.codeb.ims.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long brandId;

    private String brandName;

    private Boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "chain_id")
    private Chain chain;
}