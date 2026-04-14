package com.codeb.ims.controller;

import com.codeb.ims.dto.GroupRequest;
import com.codeb.ims.dto.GroupResponse;
import com.codeb.ims.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public GroupResponse create(@Valid @RequestBody GroupRequest request) {
        return groupService.createGroup(request);
    }

    @GetMapping
    public List<GroupResponse> getAll() {
        return groupService.getAllGroups();
    }

    @PutMapping("/{id}")
    public GroupResponse update(@PathVariable Long id,
                                @RequestBody GroupRequest request) {
        return groupService.updateGroup(id, request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return "Group deactivated successfully";
    }

    // GET /api/groups/active
    // Returns only active groups — used in Chain Management dropdown
    @GetMapping("/active")
    public ResponseEntity<?> getActiveGroups() {
        try {
            List<GroupDTO> groups = groupService.getAllActiveGroups();
            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}