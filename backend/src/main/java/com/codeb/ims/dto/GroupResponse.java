package com.codeb.ims.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GroupResponse {
    private Long groupId;
    private String groupName;
    private Boolean isActive;
}