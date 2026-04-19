import api from "./axios";

const brandService = {
  getAllBrands: () => api.get("/brands"),

  getBrandsByChain: (chainId) =>
    api.get(`/brands/chain/${chainId}`),

  addBrand: (data) =>
    api.post("/brands", data),

  updateBrand: (id, data) =>
    api.put(`/brands/${id}`, data),

  deleteBrand: (id) =>
    api.delete(`/brands/${id}`),
};

export default brandService;