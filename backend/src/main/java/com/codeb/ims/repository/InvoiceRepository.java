package com.codeb.ims.repository;

import com.codeb.ims.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findByInvoiceNo(Integer invoiceNo);

    List<Invoice> findByEstimatedId(Long estimatedId);

    List<Invoice> findByChainId(Long chainId);

    List<Invoice> findByEmailIdContainingIgnoreCase(String email);
}