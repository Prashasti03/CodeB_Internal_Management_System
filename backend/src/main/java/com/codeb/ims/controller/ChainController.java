package com.codeb.ims.controller;

import com.codeb.ims.dto.*;
import com.codeb.ims.service.ChainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chains")
@RequiredArgsConstructor
public class ChainController {

    private final ChainService chainService;

    @PostMapping
    public ChainResponse addChain(@RequestBody ChainRequest request) {
        return chainService.addChain(request);
    }

    @GetMapping
    public List<ChainResponse> getAllChains() {
        return chainService.getAllChains();
    }

    @GetMapping("/group/{groupId}")
    public List<ChainResponse> getChainsByGroup(@PathVariable Long groupId) {
        return chainService.getChainsByGroup(groupId);
    }

    @PutMapping("/{id}")
    public ChainResponse updateChain(@PathVariable Long id,
                                     @RequestBody ChainRequest request) {
        return chainService.updateChain(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteChain(@PathVariable Long id) {
        chainService.deleteChain(id);
    }
}