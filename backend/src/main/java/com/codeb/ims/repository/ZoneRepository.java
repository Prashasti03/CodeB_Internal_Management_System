package com.codeb.ims.repository;

import com.codeb.ims.entity.Zone;
import com.codeb.ims.entity.Brand;
import com.codeb.ims.entity.Chain;
import com.codeb.ims.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ZoneRepository extends JpaRepository<Zone, Long> {

    List<Zone> findByIsActiveTrue();

    List<Zone> findByBrandAndIsActiveTrue(Brand brand);

    boolean existsByBrandAndIsActiveTrue(Brand brand);

    List<Zone> findByBrand_ChainAndIsActiveTrue(Chain chain);

    List<Zone> findByBrand_Chain_GroupAndIsActiveTrue(Group group);
}