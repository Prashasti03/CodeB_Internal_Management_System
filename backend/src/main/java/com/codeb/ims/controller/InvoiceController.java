package com.codeb.ims.controller;

import com.codeb.ims.entity.Invoice;
import com.codeb.ims.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/generate/{estimateId}")
    public Invoice generate(@PathVariable Long estimateId,
            @RequestBody String email) {
        return invoiceService.generateInvoice(estimateId, email);
    }

    @GetMapping
    public List<Invoice> getAll() {
        return invoiceService.getAllInvoices();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
    }

    @PutMapping("/{id}")
    public Invoice updateEmail(@PathVariable Long id,
            @RequestParam String email) {
        return invoiceService.updateEmail(id, email);
    }
}