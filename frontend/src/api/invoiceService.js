import api from "./axios";

export const generateInvoice = (estimateId, email) => {
  return api.post(
    `/invoices/generate/${estimateId}`,
    email,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
};

// Get all invoices
export const getInvoices = () => {
  return api.get("/invoices");
};

// Delete invoice
export const deleteInvoice = (id) => {
  return api.delete(`/invoices/${id}`);
};

// Update email
export const updateInvoiceEmail = (id, email) => {
  return api.put(`/invoices/${id}?email=${email}`);
};

export const downloadInvoice = (id) => {
  return api.get(`/invoices/download/${id}`, {
    responseType: "blob",
  });
};
