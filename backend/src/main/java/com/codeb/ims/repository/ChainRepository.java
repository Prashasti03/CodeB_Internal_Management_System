// package com.ims.repository;

// import com.ims.entity.Chain;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;
// import java.util.Optional;

// // Spring Data JPA automatically implements basic CRUD methods.
// // We just declare the method signatures and Spring does the SQL for us!

// @Repository
// public interface ChainRepository extends JpaRepository<Chain, Integer> {

//     // Get all active chains (is_active = true), sorted newest first
//     List<Chain> findByIsActiveTrueOrderByCreatedAtDesc();

//     // Get all active chains belonging to a specific group
//     List<Chain> findByGroup_GroupIdAndIsActiveTrueOrderByCreatedAtDesc(Integer groupId);

//     // Check if a GSTN already exists (for duplicate validation)
//     boolean existsByGstnNo(String gstnNo);

//     // Check if a GSTN exists but belongs to a DIFFERENT chain (used during update)
//     boolean existsByGstnNoAndChainIdNot(String gstnNo, Integer chainId);

//     // Find by GSTN (used during login/invoice linking)
//     Optional<Chain> findByGstnNo(String gstnNo);

//     // boolean existsByGroup_GroupIdAndIsActiveTrue(Integer groupId);
//     boolean existsByGroupAndIsActiveTrue(Group group);
// }

package com.codeb.ims.repository;

import com.codeb.ims.entity.Chain;
import com.codeb.ims.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChainRepository extends JpaRepository<Chain, Long> {

    Optional<Chain> findByGstnNo(String gstnNo);

    List<Chain> findByIsActiveTrue();

    List<Chain> findByGroupAndIsActiveTrue(Group group);

    boolean existsByGstnNo(String gstnNo);

    boolean existsByGroupAndIsActiveTrue(Group group);

    boolean existsByGroup_GroupIdAndIsActiveTrue(Long groupId);
}