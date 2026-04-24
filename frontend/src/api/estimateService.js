import api from "./axios";

export const getEstimates = () => api.get("/estimates");

export const createEstimate = (data) => api.post("/estimates", data);

export const updateEstimate = (id, data) =>
  api.put(`/estimates/${id}`, data);

export const deleteEstimate = (id) =>
  api.delete(`/estimates/${id}`);

export const getChains = () => api.get("/chains");
export const getBrands = () => api.get("/brands");
export const getZones = () => api.get("/zones");
export const getGroups = () => api.get("/groups");