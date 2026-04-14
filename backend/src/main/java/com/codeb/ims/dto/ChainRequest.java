// package com.ims.dto;

// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;
// import jakarta.validation.constraints.Pattern;
// import jakarta.validation.constraints.Size;

// // DTO = Data Transfer Object
// // We use this instead of sending the raw Entity to the frontend.
// // It also contains validation rules for the incoming form data.

// public class ChainRequest {

//     private Integer chainId;

//     @NotBlank(message = "Company name is required")
//     @Size(max = 255, message = "Company name must be under 255 characters")
//     private String companyName;

//     // GSTN format: 2 digits + 10 char PAN + 1 digit + Z + 1 alphanumeric = 15 chars
//     @NotBlank(message = "GSTN number is required")
//     @Pattern(
//         regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
//         message = "Invalid GSTN format. Example: 27ABCDE1234F1Z5"
//     )
//     private String gstnNo;

//     private Boolean isActive;

//     @NotNull(message = "Please select a group")
//     private Integer groupId;

//     // Extra fields so frontend can show group name in the table
//     private String groupName;

//     private String createdAt;
//     private String updatedAt;

//     // ---- Getters and Setters ----

//     public Integer getChainId() { return chainId; }
//     public void setChainId(Integer chainId) { this.chainId = chainId; }

//     public String getCompanyName() { return companyName; }
//     public void setCompanyName(String companyName) { this.companyName = companyName; }

//     public String getGstnNo() { return gstnNo; }
//     public void setGstnNo(String gstnNo) { this.gstnNo = gstnNo; }

//     public Boolean getIsActive() { return isActive; }
//     public void setIsActive(Boolean isActive) { this.isActive = isActive; }

//     public Integer getGroupId() { return groupId; }
//     public void setGroupId(Integer groupId) { this.groupId = groupId; }

//     public String getGroupName() { return groupName; }
//     public void setGroupName(String groupName) { this.groupName = groupName; }

//     public String getCreatedAt() { return createdAt; }
//     public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

//     public String getUpdatedAt() { return updatedAt; }
//     public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
// }

package com.codeb.ims.dto;

import lombok.Data;

@Data
public class ChainRequest {
    private String companyName;
    private String gstnNo;
    private Long groupId;
}