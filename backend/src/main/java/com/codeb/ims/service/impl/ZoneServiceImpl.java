package com.codeb.ims.service.impl;

import com.codeb.ims.dto.ZoneRequest;
import com.codeb.ims.dto.ZoneResponse;
import com.codeb.ims.entity.Brand;
import com.codeb.ims.entity.Zone;
import com.codeb.ims.repository.BrandRepository;
import com.codeb.ims.repository.ZoneRepository;
import com.codeb.ims.service.ZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZoneServiceImpl implements ZoneService {

    private final ZoneRepository zoneRepository;
    private final BrandRepository brandRepository;

    @Override
    public ZoneResponse createZone(ZoneRequest request) {

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Zone zone = new Zone();
        zone.setZoneName(request.getZoneName());
        zone.setBrand(brand);

        Zone saved = zoneRepository.save(zone);

        return mapToResponse(saved);
    }

    @Override
    public List<ZoneResponse> getAllZones() {
        return zoneRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ZoneResponse updateZone(Long id, ZoneRequest request) {

        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        zone.setZoneName(request.getZoneName());
        zone.setBrand(brand);

        return mapToResponse(zoneRepository.save(zone));
    }

    @Override
    public void deleteZone(Long id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        zone.setIsActive(false);
        zoneRepository.save(zone);
    }

    private ZoneResponse mapToResponse(Zone zone) {
        return ZoneResponse.builder()
                .zoneId(zone.getZoneId())
                .zoneName(zone.getZoneName())
                .brandName(zone.getBrand().getBrandName())
                .companyName(zone.getBrand().getChain().getCompanyName())
                .groupName(zone.getBrand().getChain().getGroup().getGroupName())
                .build();
    }
}