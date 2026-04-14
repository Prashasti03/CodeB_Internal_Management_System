// package com.ims.service;

// import com.ims.dto.ChainDTO;
// import com.ims.entity.Chain;
// import com.ims.entity.Group;
// import com.ims.repository.BrandRepository;
// import com.ims.repository.ChainRepository;
// import com.ims.repository.GroupRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.format.DateTimeFormatter;
// import java.util.List;
// import java.util.stream.Collectors;

// // Service = the "brain" of your app.
// // It contains business rules and talks between the Controller and Repository.

// @Service
// public class ChainService {

//     @Autowired
//     private ChainRepository chainRepository;

//     @Autowired
//     private GroupRepository groupRepository;

//     @Autowired
//     private BrandRepository brandRepository;

//     private static final DateTimeFormatter FORMATTER =
//         DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

//     // ---------------------------------------------------------------
//     // GET ALL ACTIVE CHAINS
//     // Returns all chains where is_active = true
//     // ---------------------------------------------------------------
//     public List<ChainDTO> getAllActiveChains() {
//         return chainRepository.findByIsActiveTrueOrderByCreatedAtDesc()
//                 .stream()
//                 .map(this::convertToDTO)
//                 .collect(Collectors.toList());
//     }

//     // ---------------------------------------------------------------
//     // GET CHAINS FILTERED BY GROUP
//     // Used for the "Filter by Group" dropdown on the dashboard
//     // ---------------------------------------------------------------
//     public List<ChainDTO> getChainsByGroup(Integer groupId) {
//         return chainRepository.findByGroup_GroupIdAndIsActiveTrueOrderByCreatedAtDesc(groupId)
//                 .stream()
//                 .map(this::convertToDTO)
//                 .collect(Collectors.toList());
//     }

//     // ---------------------------------------------------------------
//     // GET SINGLE CHAIN BY ID
//     // Used to pre-fill the Edit form
//     // ---------------------------------------------------------------
//     public ChainDTO getChainById(Integer chainId) {
//         Chain chain = chainRepository.findById(chainId)
//                 .orElseThrow(() -> new RuntimeException("Chain not found with ID: " + chainId));
//         return convertToDTO(chain);
//     }

//     // ---------------------------------------------------------------
//     // ADD NEW CHAIN
//     // Validates GSTN uniqueness before saving
//     // ---------------------------------------------------------------
//     public ChainDTO addChain(ChainDTO dto) {
//         // Check if GSTN already exists in DB
//         if (chainRepository.existsByGstnNo(dto.getGstnNo())) {
//             throw new RuntimeException("A chain with GSTN number " + dto.getGstnNo() + " already exists.");
//         }

//         // Find the group by ID (group must exist and be active)
//         Group group = groupRepository.findById(dto.getGroupId())
//                 .orElseThrow(() -> new RuntimeException("Group not found with ID: " + dto.getGroupId()));

//         if (!group.getIsActive()) {
//             throw new RuntimeException("Cannot assign chain to an inactive group.");
//         }

//         // Build the Chain entity and save it
//         Chain chain = new Chain();
//         chain.setCompanyName(dto.getCompanyName().trim());
//         chain.setGstnNo(dto.getGstnNo().toUpperCase().trim());
//         chain.setIsActive(true);
//         chain.setGroup(group);

//         Chain saved = chainRepository.save(chain);
//         return convertToDTO(saved);
//     }

//     // ---------------------------------------------------------------
//     // UPDATE CHAIN
//     // Allows updating company name, GSTN, and group
//     // ---------------------------------------------------------------
//     public ChainDTO updateChain(Integer chainId, ChainDTO dto) {
//         Chain chain = chainRepository.findById(chainId)
//                 .orElseThrow(() -> new RuntimeException("Chain not found with ID: " + chainId));

//         // Check if another chain already has this GSTN (excluding current chain)
//         if (chainRepository.existsByGstnNoAndChainIdNot(dto.getGstnNo(), chainId)) {
//             throw new RuntimeException("GSTN number " + dto.getGstnNo() + " is already used by another chain.");
//         }

//         Group group = groupRepository.findById(dto.getGroupId())
//                 .orElseThrow(() -> new RuntimeException("Group not found with ID: " + dto.getGroupId()));

//         if (!group.getIsActive()) {
//             throw new RuntimeException("Cannot assign chain to an inactive group.");
//         }

//         chain.setCompanyName(dto.getCompanyName().trim());
//         chain.setGstnNo(dto.getGstnNo().toUpperCase().trim());
//         chain.setGroup(group);

//         Chain updated = chainRepository.save(chain);
//         return convertToDTO(updated);
//     }

//     // ---------------------------------------------------------------
//     // SOFT DELETE CHAIN
//     // Before deleting, we check if this chain has any active brands.
//     // If yes → cannot delete (as per requirement).
//     // If no → set is_active = false (soft delete).
//     // ---------------------------------------------------------------
//     public String deleteChain(Integer chainId) {
//         Chain chain = chainRepository.findById(chainId)
//                 .orElseThrow(() -> new RuntimeException("Chain not found with ID: " + chainId));

//         // 🔒 KEY BUSINESS RULE: Check if brand is linked to this chain
//         boolean hasBrands = brandRepository.existsByChain_ChainIdAndIsActiveTrue(chainId);

//         if (hasBrands) {
//             // Cannot delete — brands are still linked
//             throw new RuntimeException(
//                 "Cannot delete chain '" + chain.getCompanyName() +
//                 "' because it has active brands linked to it. " +
//                 "Please remove all brands first."
//             );
//         }

//         // Safe to soft delete
//         chain.setIsActive(false);
//         chainRepository.save(chain);
//         return "Chain '" + chain.getCompanyName() + "' has been deactivated successfully.";
//     }

//     // ---------------------------------------------------------------
//     // HELPER: Convert Chain entity → ChainDTO
//     // We never send the raw Entity to frontend — always use DTO
//     // ---------------------------------------------------------------
//     private ChainDTO convertToDTO(Chain chain) {
//         ChainDTO dto = new ChainDTO();
//         dto.setChainId(chain.getChainId());
//         dto.setCompanyName(chain.getCompanyName());
//         dto.setGstnNo(chain.getGstnNo());
//         dto.setIsActive(chain.getIsActive());
//         dto.setGroupId(chain.getGroup().getGroupId());
//         dto.setGroupName(chain.getGroup().getGroupName());
//         if (chain.getCreatedAt() != null)
//             dto.setCreatedAt(chain.getCreatedAt().format(FORMATTER));
//         if (chain.getUpdatedAt() != null)
//             dto.setUpdatedAt(chain.getUpdatedAt().format(FORMATTER));
//         return dto;
//     }
// }

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