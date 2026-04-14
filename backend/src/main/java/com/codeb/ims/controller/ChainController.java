package com.ims.controller;

import com.ims.dto.ChainDTO;
import com.ims.service.ChainService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Controller = the "front door" of your backend.
// It receives HTTP requests from React and sends back JSON responses.

@RestController
@RequestMapping("/api/chains")         // All endpoints start with /api/chains
@CrossOrigin(origins = "*")            // Allows React (Netlify) to call this API
public class ChainController {

    @Autowired
    private ChainService chainService;

    // ---------------------------------------------------------------
    // GET /api/chains
    // Returns all active chains (no filter)
    // ---------------------------------------------------------------
    @GetMapping
    public ResponseEntity<?> getAllChains() {
        try {
            List<ChainDTO> chains = chainService.getAllActiveChains();
            return ResponseEntity.ok(chains);
        } catch (Exception e) {
            return buildError(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ---------------------------------------------------------------
    // GET /api/chains/by-group/{groupId}
    // Returns chains filtered by a specific group
    // ---------------------------------------------------------------
    @GetMapping("/by-group/{groupId}")
    public ResponseEntity<?> getChainsByGroup(@PathVariable Integer groupId) {
        try {
            List<ChainDTO> chains = chainService.getChainsByGroup(groupId);
            return ResponseEntity.ok(chains);
        } catch (Exception e) {
            return buildError(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // ---------------------------------------------------------------
    // GET /api/chains/{id}
    // Returns a single chain by ID (used to pre-fill the edit form)
    // ---------------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getChainById(@PathVariable Integer id) {
        try {
            ChainDTO chain = chainService.getChainById(id);
            return ResponseEntity.ok(chain);
        } catch (Exception e) {
            return buildError(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // ---------------------------------------------------------------
    // POST /api/chains
    // Creates a new chain. @Valid triggers the annotations in ChainDTO.
    // ---------------------------------------------------------------
    @PostMapping
    public ResponseEntity<?> addChain(@Valid @RequestBody ChainDTO dto) {
        try {
            ChainDTO created = chainService.addChain(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return buildError(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // ---------------------------------------------------------------
    // PUT /api/chains/{id}
    // Updates an existing chain
    // ---------------------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateChain(@PathVariable Integer id,
                                          @Valid @RequestBody ChainDTO dto) {
        try {
            ChainDTO updated = chainService.updateChain(id, dto);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return buildError(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // ---------------------------------------------------------------
    // DELETE /api/chains/{id}
    // Soft deletes a chain (sets is_active = false)
    // Will fail if chain has active brands linked to it
    // ---------------------------------------------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChain(@PathVariable Integer id) {
        try {
            String message = chainService.deleteChain(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", message);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return buildError(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // ---------------------------------------------------------------
    // HELPER: Build a consistent error response body
    // { "error": "message here" }
    // ---------------------------------------------------------------
    private ResponseEntity<Map<String, String>> buildError(String message, HttpStatus status) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        return ResponseEntity.status(status).body(error);
    }
}