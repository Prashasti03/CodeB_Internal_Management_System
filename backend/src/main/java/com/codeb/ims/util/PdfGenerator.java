package com.codeb.ims.util;

import com.codeb.ims.entity.Invoice;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;

public class PdfGenerator {

    public static byte[] generateInvoicePdf(Invoice invoice) {

        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);

            document.add(new Paragraph("INVOICE", titleFont));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Invoice No: " + invoice.getInvoiceNo()));
            document.add(new Paragraph("Estimate ID: " + invoice.getEstimatedId()));
            document.add(new Paragraph("Service: " + invoice.getServiceDetails()));
            document.add(new Paragraph("Quantity: " + invoice.getQty()));
            document.add(new Paragraph("Cost per unit: " + invoice.getCostPerQty()));
            document.add(new Paragraph("Total Amount: " + invoice.getAmountPayable()));
            document.add(new Paragraph("Email: " + invoice.getEmailId()));

            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF");
        }
    }
}