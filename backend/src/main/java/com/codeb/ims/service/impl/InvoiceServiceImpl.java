package com.codeb.ims.service.impl;

import com.codeb.ims.entity.Estimate;
import com.codeb.ims.entity.Invoice;
import com.codeb.ims.repository.EstimateRepository;
import com.codeb.ims.repository.InvoiceRepository;
import com.codeb.ims.service.EmailService;
import com.codeb.ims.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.codeb.ims.util.PdfGenerator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final EstimateRepository estimateRepository;
    private final EmailService emailService;

    @Override
    public Invoice generateInvoice(Long estimateId, String email) {

        email = java.net.URLDecoder.decode(email, java.nio.charset.StandardCharsets.UTF_8);

        Estimate est = estimateRepository.findById(estimateId)
                .orElseThrow(() -> new RuntimeException("Estimate not found"));

        int invoiceNo = (int) (System.currentTimeMillis() % 100000);

        Invoice invoice = Invoice.builder()
                .invoiceNo(invoiceNo)
                .estimatedId(est.getEstimatedId())
                .chainId(est.getChainId())
                .serviceDetails(est.getService())
                .qty(est.getQty())
                .costPerQty(est.getCostPerUnit())
                .amountPayable(est.getTotalCost())
                .balance(0.0)
                .dateOfPayment(LocalDateTime.now())
                .dateOfService(est.getDeliveryDate())
                .deliveryDetails(est.getDeliveryDetails())
                .emailId(email)
                .build();

        Invoice saved = invoiceRepository.save(invoice);
        System.out.println("EMAIL RECEIVED: " + email);

        // Generate PDF
        byte[] pdf = PdfGenerator.generateInvoicePdf(saved);

        System.out.println("1. Sending invoice email with attachment...");

        // Send Email with attachment
        emailService.sendEmailWithAttachment(
                email,
                "Invoice Generated",
                "Please find attached invoice.",
                pdf);

        return saved;
    }

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Override
    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }

    @Override
    public Invoice updateEmail(Long id, String email) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        invoice.setEmailId(email);
        return invoiceRepository.save(invoice);
    }
}