package com.codeb.ims.service.impl;

import com.codeb.ims.dto.EstimateRequest;
import com.codeb.ims.dto.EstimateResponse;
import com.codeb.ims.entity.Estimate;
import com.codeb.ims.repository.EstimateRepository;
import com.codeb.ims.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EstimateServiceImpl implements EstimateService {

    private final EstimateRepository estimateRepository;

    @Override
    public EstimateResponse createEstimate(EstimateRequest request) {

        Double totalCost = request.getQty() * request.getCostPerUnit();

        Estimate estimate = Estimate.builder()
                .chainId(request.getChainId())
                .chainName(request.getChainName())
                .groupName(request.getGroupName())
                .brandName(request.getBrandName())
                .zoneName(request.getZoneName())
                .service(request.getService())
                .qty(request.getQty())
                .costPerUnit(request.getCostPerUnit())
                .totalCost(totalCost)
                .deliveryDate(request.getDeliveryDate())
                .deliveryDetails(request.getDeliveryDetails())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Estimate saved = estimateRepository.save(estimate);

        return mapToResponse(saved);
    }

    @Override
    public List<EstimateResponse> getAllEstimates() {
        return estimateRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EstimateResponse updateEstimate(Long id, EstimateRequest request) {

        Estimate estimate = estimateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estimate not found"));

        estimate.setChainId(request.getChainId());
        estimate.setChainName(request.getChainName());
        estimate.setGroupName(request.getGroupName());
        estimate.setBrandName(request.getBrandName());
        estimate.setZoneName(request.getZoneName());
        estimate.setService(request.getService());
        estimate.setQty(request.getQty());
        estimate.setCostPerUnit(request.getCostPerUnit());

        estimate.setTotalCost(request.getQty() * request.getCostPerUnit());

        estimate.setDeliveryDate(request.getDeliveryDate());
        estimate.setDeliveryDetails(request.getDeliveryDetails());
        estimate.setUpdatedAt(LocalDateTime.now());

        return mapToResponse(estimateRepository.save(estimate));
    }

    @Override
    public void deleteEstimate(Long id) {
        estimateRepository.deleteById(id);
    }

    private EstimateResponse mapToResponse(Estimate e) {
        return EstimateResponse.builder()
                .estimatedId(e.getEstimatedId())
                .chainId(e.getChainId())
                .groupName(e.getGroupName())
                .brandName(e.getBrandName())
                .zoneName(e.getZoneName())
                .service(e.getService())
                .qty(e.getQty())
                .costPerUnit(e.getCostPerUnit())
                .totalCost(e.getTotalCost())
                .deliveryDate(e.getDeliveryDate())
                .deliveryDetails(e.getDeliveryDetails())
                .createdAt(e.getCreatedAt())
                .build();
    }
}