package com.codeb.ims.service.impl;

import com.codeb.ims.dto.GroupRequest;
import com.codeb.ims.dto.GroupResponse;
import com.codeb.ims.entity.Group;
import com.codeb.ims.repository.GroupRepository;
import com.codeb.ims.repository.ChainRepository;
import com.codeb.ims.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
@RequiredArgsConstructor

public class GroupServiceImpl implements GroupService {

    // @Autowired
    private final ChainRepository chainRepository;

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
    public String deleteGroup(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found with ID: " + groupId));

        // CHECK: is group linked with any chain
        boolean exists = chainRepository.existsByGroup_GroupIdAndIsActiveTrue(groupId);

        if (exists) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot delete group. It is linked with existing chains.");
        }

        group.setIsActive(false); // soft delete
        groupRepository.save(group);
        return "Group '" + group.getGroupName() + "' has been deactivated successfully.";
    }

    @Override
    public List<GroupResponse> getAllActiveGroups() {
        return groupRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private GroupResponse mapToResponse(Group group) {
        return GroupResponse.builder()
                .groupId(group.getGroupId())
                .groupName(group.getGroupName())
                .isActive(group.getIsActive())
                .build();
    }

}