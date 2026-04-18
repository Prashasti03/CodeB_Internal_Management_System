package com.codeb.ims.service;

import com.codeb.ims.dto.BrandRequest;
import com.codeb.ims.dto.BrandResponse;

import java.util.List;

public interface BrandService {

    BrandResponse addBrand(BrandRequest request);

    List<BrandResponse> getAllBrands();

    List<BrandResponse> getBrandsByChain(Long chainId);

    BrandResponse updateBrand(Long id, BrandRequest request);

    void deleteBrand(Long id);
}