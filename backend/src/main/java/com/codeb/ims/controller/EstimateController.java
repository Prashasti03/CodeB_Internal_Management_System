package com.codeb.ims.controller;

import com.codeb.ims.dto.EstimateRequest;
import com.codeb.ims.dto.EstimateResponse;
import com.codeb.ims.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estimates")
@RequiredArgsConstructor
public class EstimateController {

    private final EstimateService estimateService;

    @PostMapping
    public EstimateResponse create(@RequestBody EstimateRequest request) {
        return estimateService.createEstimate(request);
    }

    @GetMapping
    public List<EstimateResponse> getAll() {
        return estimateService.getAllEstimates();
    }

    @PutMapping("/{id}")
    public EstimateResponse update(@PathVariable Long id,
                                   @RequestBody EstimateRequest request) {
        return estimateService.updateEstimate(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        estimateService.deleteEstimate(id);
    }
}