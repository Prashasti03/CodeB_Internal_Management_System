import api from "./axios";

export const getGroups = () => api.get("/groups");

export const createGroup = (data) => api.post("/groups", data);

export const updateGroup = (id, data) => api.put(`/groups/${id}`, data);

export const deleteGroup = (id) => api.delete(`/groups/${id}`);

export const getActiveGroups = () => api.get("/groups/active");

// export const getAllActiveGroups: () =>
    // fetch(`${BASE_URL}/api/groups/active`, { headers: getAuthHeader() }).then(handleResponse);