import api from "./axios";

// Generate invoice
// export const generateInvoice = (estimateId, email) => {
//   return api.post(`/invoices/generate/${estimateId}?email=${email}`);
// };

export const generateInvoice = (estimateId, email) => {
  return api.post(`/invoices/generate/${estimateId}`, email);
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
