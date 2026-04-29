package com.codeb.ims.util;

import com.codeb.ims.entity.Invoice;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
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

            PdfPTable table = new PdfPTable(4);

            table.addCell("Service");
            table.addCell("Qty");
            table.addCell("Cost");
            table.addCell("Total");

            table.addCell(invoice.getServiceDetails());
            table.addCell(String.valueOf(invoice.getQty()));
            table.addCell(String.valueOf(invoice.getCostPerQty()));
            table.addCell(String.valueOf(invoice.getAmountPayable()));

            document.add(table);

            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF");
        }
    }
}