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
    public void deleteGroup(Long id) {

        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        // Soft delete
        group.setIsActive(false);

        groupRepository.save(group);
    }

    private GroupResponse mapToResponse(Group group) {
        return GroupResponse.builder()
                .groupId(group.getGroupId())
                .groupName(group.getGroupName())
                .isActive(group.getIsActive())
                .build();
    }
}