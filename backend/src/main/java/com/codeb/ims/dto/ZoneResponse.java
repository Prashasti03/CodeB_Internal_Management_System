package com.codeb.ims.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ZoneResponse {
    private Long zoneId;
    private String zoneName;
    private String brandName;
    private String companyName;
    private String groupName;
}