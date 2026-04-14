// package com.codeb.ims.repository;

// import com.ims.entity.Brand;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// // NOTE: This is a stub repository for the Brand module (Module 4).
// // The ChainService uses this to check if a chain has any brands linked to it
// // before allowing deletion. We will fill out this module later.

// @Repository
// public interface BrandRepository extends JpaRepository<Brand, Integer> {

//     // Check if any brand is linked to a given chain_id
//     // This is used to block deletion of a chain that has brands
//     boolean existsByChain_ChainIdAndIsActiveTrue(Integer chainId);
// }

package com.codeb.ims.repository;

import com.codeb.ims.entity.Brand;
import com.codeb.ims.entity.Chain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    boolean existsByChainAndIsActiveTrue(Chain chain);
}