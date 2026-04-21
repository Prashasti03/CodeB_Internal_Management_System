package com.codeb.ims.controller;

import com.codeb.ims.dto.ZoneRequest;
import com.codeb.ims.dto.ZoneResponse;
import com.codeb.ims.service.ZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zones")
@RequiredArgsConstructor
public class ZoneController {

    private final ZoneService zoneService;

    @PostMapping
    public ZoneResponse create(@RequestBody ZoneRequest request) {
        return zoneService.createZone(request);
    }

    @GetMapping
    public List<ZoneResponse> getAll() {
        return zoneService.getAllZones();
    }

    @PutMapping("/{id}")
    public ZoneResponse update(@PathVariable Long id, @RequestBody ZoneRequest request) {
        return zoneService.updateZone(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        zoneService.deleteZone(id);
    }
}