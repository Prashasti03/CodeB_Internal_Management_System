package com.codeb.ims.dto;

import lombok.Data;

@Data
public class ChainRequest {
    private String companyName;
    private String gstnNo;
    private Long groupId;
}