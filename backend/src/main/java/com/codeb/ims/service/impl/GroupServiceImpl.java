package com.codeb.ims.service.impl;

import com.codeb.ims.dto.GroupRequest;
import com.codeb.ims.dto.GroupResponse;
import com.codeb.ims.entity.Group;
import com.codeb.ims.repository.GroupRepository;
import com.codeb.ims.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class GroupServiceImpl implements GroupService {

    @Autowired
    private ChainRepository chainRepository;

    private final GroupRepository groupRepository;

    @Override
    public GroupResponse createGroup(GroupRequest request) {

        groupRepository.findByGroupName(request.getGroupName())
                .ifPresent(g -> {
                    throw new RuntimeException("Group with this name already exists");
                });

        Group group = Group.builder()
                .groupName(request.getGroupName())
                .isActive(true)
                .build();

        groupRepository.save(group);

        return mapToResponse(group);
    }

    @Override
    public List<GroupResponse> getAllGroups() {
        return groupRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public GroupResponse updateGroup(Long id, GroupRequest request) {

        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.setGroupName(request.getGroupName());

        groupRepository.save(group);

        return mapToResponse(group);
    }

    @Override
    public String deleteGroup(Integer groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found with ID: " + groupId));
 
        // ✅ NEW CHECK: Does this group have any active chains?
        boolean hasChains = chainRepository.existsByGroup_GroupIdAndIsActiveTrue(groupId);
 
        if (hasChains) {
            throw new RuntimeException(
                "Cannot delete group '" + group.getGroupName() +
                "' because it has active chains/companies linked to it. " +
                "Please remove all chains from this group first."
            );
        }
 
        // Safe to soft delete the group
        group.setIsActive(false);
        groupRepository.save(group);
        return "Group '" + group.getGroupName() + "' has been deactivated successfully.";
    }

    
}