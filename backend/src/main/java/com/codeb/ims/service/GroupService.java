package com.codeb.ims.service;

import com.codeb.ims.dto.GroupRequest;
import com.codeb.ims.dto.GroupResponse;

import java.util.List;

public interface GroupService {

    GroupResponse createGroup(GroupRequest request);

    List<GroupResponse> getAllGroups();

    GroupResponse updateGroup(Long id, GroupRequest request);

    void deleteGroup(Long id);
}