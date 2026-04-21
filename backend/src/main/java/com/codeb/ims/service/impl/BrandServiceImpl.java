package com.codeb.ims.service.impl;

import com.codeb.ims.dto.BrandRequest;
import com.codeb.ims.dto.BrandResponse;
import com.codeb.ims.entity.Brand;
import com.codeb.ims.entity.Chain;
import com.codeb.ims.repository.BrandRepository;
import com.codeb.ims.repository.ChainRepository;
import com.codeb.ims.repository.ZoneRepository;
import com.codeb.ims.service.BrandService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final ChainRepository chainRepository;
    private final ZoneRepository zoneRepository;

    @Override
    public BrandResponse addBrand(BrandRequest request) {

        Chain chain = chainRepository.findById(request.getChainId())
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        Brand brand = Brand.builder()
                .brandName(request.getBrandName())
                .chain(chain)
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Brand saved = brandRepository.save(brand);

        return mapToResponse(saved);
    }

    @Override
    public List<BrandResponse> getAllBrands() {
        return brandRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BrandResponse> getBrandsByChain(Long chainId) {
        return brandRepository.findByChain_ChainIdAndIsActiveTrue(chainId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BrandResponse updateBrand(Long id, BrandRequest request) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Chain chain = chainRepository.findById(request.getChainId())
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        brand.setBrandName(request.getBrandName());
        brand.setChain(chain);
        brand.setUpdatedAt(LocalDateTime.now());

        return mapToResponse(brandRepository.save(brand));
    }

    @Override
    public void deleteBrand(Long brandId) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        boolean exists = zoneRepository.existsByBrandAndIsActiveTrue(brand);

        if (exists) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot delete brand. It is linked with zones.");
        }

        brand.setIsActive(false);
        brandRepository.save(brand);
    }

    // 🔁 MAPPER METHOD
    private BrandResponse mapToResponse(Brand brand) {
        BrandResponse res = new BrandResponse();
        res.setBrandId(brand.getBrandId());
        res.setBrandName(brand.getBrandName());
        res.setChainId(brand.getChain().getChainId());
        res.setCompanyName(brand.getChain().getCompanyName());
        res.setGroupName(brand.getChain().getGroup().getGroupName());
        return res;
    }
}