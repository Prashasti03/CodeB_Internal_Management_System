package com.codeb.ims.service;

import com.codeb.ims.dto.ChainRequest;
import com.codeb.ims.dto.ChainResponse;

import java.util.List;

public interface ChainService {

    ChainResponse addChain(ChainRequest request);

    List<ChainResponse> getAllChains();

    List<ChainResponse> getChainsByGroup(Long groupId);

    ChainResponse updateChain(Long id, ChainRequest request);

    void deleteChain(Long id);
}