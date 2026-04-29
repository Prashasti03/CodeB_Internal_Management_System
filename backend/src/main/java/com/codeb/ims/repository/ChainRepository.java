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