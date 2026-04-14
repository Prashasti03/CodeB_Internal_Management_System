package com.codeb.ims.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChainResponse {
    private Long chainId;
    private String companyName;
    private String gstnNo;
    private String groupName;
}