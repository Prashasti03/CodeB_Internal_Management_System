package com.codeb.ims.repository;

import com.codeb.ims.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {

    Optional<Group> findByGroupName(String groupName);

    List<Group> findByIsActiveTrue();
}