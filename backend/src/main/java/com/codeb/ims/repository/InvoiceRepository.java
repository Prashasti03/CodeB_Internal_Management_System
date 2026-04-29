package com.codeb.ims.repository;

import com.codeb.ims.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findByInvoiceNo(Integer invoiceNo);

    List<Invoice> findByEstimatedId(Long estimatedId);

    List<Invoice> findByChainId(Long chainId);

    List<Invoice> findByEmailIdContainingIgnoreCase(String email);

    boolean existsByInvoiceNo(Integer invoiceNo);

    @Query("SELECT i FROM Invoice i WHERE " +
            "CAST(i.invoiceNo AS string) LIKE %:q% OR " +
            "CAST(i.estimatedId AS string) LIKE %:q% OR " +
            "CAST(i.chainId AS string) LIKE %:q% OR " +
            "LOWER(i.serviceDetails) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Invoice> search(String q);
}