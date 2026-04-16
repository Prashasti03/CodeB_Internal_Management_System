import api from "./axios";

const chainService = {
  getAllChains: () => api.get("/chains"),

  getChainsByGroup: (groupId) =>
    api.get(`/chains/by-group/${groupId}`),

  getChainById: (id) =>
    api.get(`/chains/${id}`),

  addChain: (data) =>
    api.post("/chains", data),

  updateChain: (id, data) =>
    api.put(`/chains/${id}`, data),

  deleteChain: (id) =>
    api.delete(`/chains/${id}`),
};

export default chainService;