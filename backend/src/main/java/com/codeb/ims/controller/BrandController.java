package com.codeb.ims.controller;

import com.codeb.ims.dto.BrandRequest;
import com.codeb.ims.dto.BrandResponse;
import com.codeb.ims.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @PostMapping
    public BrandResponse addBrand(@RequestBody BrandRequest request) {
        return brandService.addBrand(request);
    }

    @GetMapping
    public List<BrandResponse> getAll() {
        return brandService.getAllBrands();
    }

    @GetMapping("/chain/{chainId}")
    public List<BrandResponse> getByChain(@PathVariable Long chainId) {
        return brandService.getBrandsByChain(chainId);
    }

    @PutMapping("/{id}")
    public BrandResponse update(@PathVariable Long id, @RequestBody BrandRequest request) {
        return brandService.updateBrand(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return "Brand deleted successfully";
    }
}