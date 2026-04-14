package com.codeb.ims.service.impl;

import com.codeb.ims.dto.*;
import com.codeb.ims.entity.*;
import com.codeb.ims.repository.*;
import com.codeb.ims.service.ChainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChainServiceImpl implements ChainService {

    private final ChainRepository chainRepository;
    private final GroupRepository groupRepository;
    private final BrandRepository brandRepository;

    @Override
    public ChainResponse addChain(ChainRequest request) {

        if (chainRepository.existsByGstnNo(request.getGstnNo())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "GSTN already exists");
        }

        Group group = groupRepository.findById(request.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Chain chain = new Chain();
        chain.setCompanyName(request.getCompanyName());
        chain.setGstnNo(request.getGstnNo());
        chain.setGroup(group);

        Chain saved = chainRepository.save(chain);

        return mapToResponse(saved);
    }

    @Override
    public List<ChainResponse> getAllChains() {
        return chainRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ChainResponse> getChainsByGroup(Long groupId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        return chainRepository.findByGroupAndIsActiveTrue(group)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ChainResponse updateChain(Long id, ChainRequest request) {

        Chain chain = chainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        chain.setCompanyName(request.getCompanyName());
        chain.setGstnNo(request.getGstnNo());

        return mapToResponse(chainRepository.save(chain));
    }

    @Override
    public void deleteChain(Long id) {

        Chain chain = chainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        // CHECK brand relation
        boolean exists = brandRepository.existsByChainAndIsActiveTrue(chain);

        if (exists) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot delete chain. It is linked with brands.");
        }

        chain.setIsActive(false);
        chainRepository.save(chain);
    }

    private ChainResponse mapToResponse(Chain chain) {
        return ChainResponse.builder()
                .chainId(chain.getChainId())
                .companyName(chain.getCompanyName())
                .gstnNo(chain.getGstnNo())
                .groupName(chain.getGroup().getGroupName())
                .build();
    }
}