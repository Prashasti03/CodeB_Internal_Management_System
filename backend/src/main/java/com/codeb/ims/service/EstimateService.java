package com.codeb.ims.service;

import com.codeb.ims.dto.EstimateRequest;
import com.codeb.ims.dto.EstimateResponse;

import java.util.List;

public interface EstimateService {

    EstimateResponse createEstimate(EstimateRequest request);

    List<EstimateResponse> getAllEstimates();

    EstimateResponse updateEstimate(Long id, EstimateRequest request);

    void deleteEstimate(Long id);
}