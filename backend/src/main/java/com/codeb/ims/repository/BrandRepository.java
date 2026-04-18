package com.codeb.ims.repository;

import com.codeb.ims.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    List<Brand> findByIsActiveTrue();

    List<Brand> findByChain_ChainIdAndIsActiveTrue(Long chainId);

    boolean existsByChain_ChainIdAndIsActiveTrue(Long chainId);

    boolean existsByBrandIdAndIsActiveTrue(Long brandId);
}