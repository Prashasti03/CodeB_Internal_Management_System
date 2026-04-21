import api from "./axios";

export const getBrands = () => api.get("/brands");

export const getBrandsByChain = (chainId) =>
  api.get(`/brands/chain/${chainId}`);

export const addBrand = (data) =>
  api.post("/brands", data);

export const updateBrand = (id, data) =>
  api.put(`/brands/${id}`, data);

export const deleteBrand = (id) =>
  api.delete(`/brands/${id}`);