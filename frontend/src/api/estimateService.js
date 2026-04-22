import api from "./axios";

export const getEstimates = () => api.get("/estimates");

export const createEstimate = (data) => api.post("/estimates", data);

export const updateEstimate = (id, data) =>
  api.put(`/estimates/${id}`, data);

export const deleteEstimate = (id) =>
  api.delete(`/estimates/${id}`);