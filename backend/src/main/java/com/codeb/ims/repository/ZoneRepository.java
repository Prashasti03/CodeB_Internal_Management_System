package com.codeb.ims.repository;

import com.codeb.ims.entity.Zone;
import com.codeb.ims.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ZoneRepository extends JpaRepository<Zone, Long> {

    List<Zone> findByIsActiveTrue();

    List<Zone> findByBrandAndIsActiveTrue(Brand brand);
    
    boolean existsByBrandAndIsActiveTrue(Brand brand);
}