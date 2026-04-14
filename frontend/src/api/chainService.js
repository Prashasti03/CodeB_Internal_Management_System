import api from "./axios";
// This file handles all API calls for the Chain Management Module.
// Think of it as the "messenger" between your React components and the Spring Boot backend.

const BASE_URL = process.env.REACT_APP_API_URL || "https://codeb-internal-management-system.onrender.com";

// Helper: get the auth token from localStorage (from your login module)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper: parse API response and throw readable errors
const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || "Something went wrong. Please try again.");
  }
  return data;
};

// export const getGroups = () => api.get("/groups");

// export const createGroup = (data) => api.post("/groups", data);

// export const updateGroup = (id, data) => api.put(`/groups/${id}`, data);

// export const deleteGroup = (id) => api.delete(`/groups/${id}`);

const chainService = {
  // GET all active chains
  getAllChains: () =>
    fetch(`${BASE_URL}/api/chains`, { headers: getAuthHeader() }).then(handleResponse),

  // GET chains filtered by group
  getChainsByGroup: (groupId) =>
    fetch(`${BASE_URL}/api/chains/by-group/${groupId}`, { headers: getAuthHeader() }).then(handleResponse),

  // GET single chain by ID (for edit pre-fill)
  getChainById: (id) =>
    fetch(`${BASE_URL}/api/chains/${id}`, { headers: getAuthHeader() }).then(handleResponse),

  // POST - Add new chain
  addChain: (chainData) =>
    fetch(`${BASE_URL}/api/chains`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(chainData),
    }).then(handleResponse),

  // PUT - Update existing chain
  updateChain: (id, chainData) =>
    fetch(`${BASE_URL}/api/chains/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(chainData),
    }).then(handleResponse),

  // DELETE - Soft delete chain
  deleteChain: (id) =>
    fetch(`${BASE_URL}/api/chains/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    }).then(handleResponse),
};

export default chainService;