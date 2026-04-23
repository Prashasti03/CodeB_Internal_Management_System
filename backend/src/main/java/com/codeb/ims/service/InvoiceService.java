package com.codeb.ims.service;

import com.codeb.ims.entity.Invoice;

import java.util.List;

public interface InvoiceService {

    Invoice generateInvoice(Long estimateId, String email);

    List<Invoice> getAllInvoices();

    void deleteInvoice(Long id);

    Invoice updateEmail(Long id, String email);

}