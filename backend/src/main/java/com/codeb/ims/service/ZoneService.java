package com.codeb.ims.service;

import com.codeb.ims.dto.ZoneRequest;
import com.codeb.ims.dto.ZoneResponse;

import java.util.List;

public interface ZoneService {
    ZoneResponse createZone(ZoneRequest request);
    List<ZoneResponse> getAllZones();
    ZoneResponse updateZone(Long id, ZoneRequest request);
    void deleteZone(Long id);
    List<ZoneResponse> filterZones(Long brandId, Long chainId, Long groupId);
}