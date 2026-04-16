// // src/pages/ChainManagement/ChainDashboard.jsx
// // This is the main page for Chain Management.
// // It shows a table of all chains with filter by group, and buttons for Add/Edit/Delete.

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// // import chainService from "../../api/chainService";
// // import groupService from "../../api/groupService";
// import chainService from "../api/chainService";
// import { getGroups, createGroup, deleteGroup, updateGroup } from "../api/groupService";

// const ChainDashboard = () => {
//   const navigate = useNavigate();

//   // State: list of chains shown in the table
//   const [chains, setChains] = useState([]);
//   // State: list of groups for the filter dropdown
//   const [groups, setGroups] = useState([]);
//   // State: which group is selected in filter (empty = show all)
//   const [selectedGroupId, setSelectedGroupId] = useState("");
//   // State: loading spinner
//   const [loading, setLoading] = useState(true);
//   // State: error message
//   const [error, setError] = useState("");
//   // State: success message (shown after delete/update)
//   const [successMsg, setSuccessMsg] = useState("");
//   // State: which chain ID is being deleted (for confirmation modal)
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   // State: loading spinner for delete button
//   const [deleting, setDeleting] = useState(false);

//   // Load groups for the filter dropdown (runs once when page loads)
//   useEffect(() => {
//     groupService.getAllActiveGroups()
//       .then(setGroups)
//       .catch(() => setGroups([]));
//   }, []);

//   // Load chains — re-runs when selectedGroupId changes
//   const loadChains = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     try {
//       let data;
//       if (selectedGroupId) {
//         // Filter by selected group
//         data = await chainService.getChainsByGroup(selectedGroupId);
//       } else {
//         // Show all active chains
//         data = await chainService.getAllChains();
//       }
//       setChains(data);
//     } catch (err) {
//       setError(err.message || "Failed to load chains.");
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedGroupId]);

//   useEffect(() => {
//     loadChains();
//   }, [loadChains]);

//   // Handle delete confirmation
//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       const res = await chainService.deleteChain(deleteTarget.chainId);
//       setSuccessMsg(res.message || "Chain deleted successfully.");
//       setDeleteTarget(null);
//       loadChains(); // Refresh the table
//       // Auto-hide success message after 4 seconds
//       setTimeout(() => setSuccessMsg(""), 4000);
//     } catch (err) {
//       setError(err.message || "Failed to delete chain.");
//       setDeleteTarget(null);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="container-fluid py-4">
//       {/* ---- Page Header ---- */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="fw-bold mb-1 text-dark">
//             <i className="bi bi-building me-2 text-primary"></i>
//             Chain Management
//           </h4>
//           <p className="text-muted small mb-0">
//             Manage companies/chains and their GST numbers linked to customer groups.
//           </p>
//         </div>
//         <button
//           className="btn btn-primary px-4"
//           onClick={() => navigate("/chains/add")}
//         >
//           <i className="bi bi-plus-circle me-2"></i>Add Chain
//         </button>
//       </div>

//       {/* ---- Alert Messages ---- */}
//       {successMsg && (
//         <div className="alert alert-success alert-dismissible fade show" role="alert">
//           <i className="bi bi-check-circle me-2"></i>{successMsg}
//           <button type="button" className="btn-close" onClick={() => setSuccessMsg("")}></button>
//         </div>
//       )}
//       {error && (
//         <div className="alert alert-danger alert-dismissible fade show" role="alert">
//           <i className="bi bi-exclamation-triangle me-2"></i>{error}
//           <button type="button" className="btn-close" onClick={() => setError("")}></button>
//         </div>
//       )}

//       {/* ---- Filter + Stats Card ---- */}
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body">
//           <div className="row align-items-center">
//             {/* Filter by Group Dropdown */}
//             <div className="col-md-4">
//               <label className="form-label fw-semibold small text-muted">
//                 <i className="bi bi-funnel me-1"></i>Filter by Group
//               </label>
//               <select
//                 className="form-select"
//                 value={selectedGroupId}
//                 onChange={(e) => setSelectedGroupId(e.target.value)}
//               >
//                 <option value="">All Groups</option>
//                 {groups.map((g) => (
//                   <option key={g.groupId} value={g.groupId}>
//                     {g.groupName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Stats */}
//             <div className="col-md-8 mt-3 mt-md-0">
//               <div className="d-flex gap-3 justify-content-md-end">
//                 <div className="text-center px-3 py-2 bg-primary bg-opacity-10 rounded-3">
//                   <div className="fw-bold text-primary fs-4">{chains.length}</div>
//                   <div className="text-muted small">Total Chains</div>
//                 </div>
//                 <div className="text-center px-3 py-2 bg-success bg-opacity-10 rounded-3">
//                   <div className="fw-bold text-success fs-4">{groups.length}</div>
//                   <div className="text-muted small">Active Groups</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ---- Chain Table ---- */}
//       <div className="card border-0 shadow-sm">
//         <div className="card-body p-0">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status"></div>
//               <p className="mt-2 text-muted">Loading chains...</p>
//             </div>
//           ) : chains.length === 0 ? (
//             <div className="text-center py-5">
//               <i className="bi bi-building-x fs-1 text-muted"></i>
//               <p className="mt-3 text-muted">
//                 {selectedGroupId ? "No chains found for the selected group." : "No chains added yet."}
//               </p>
//               <button className="btn btn-outline-primary" onClick={() => navigate("/chains/add")}>
//                 <i className="bi bi-plus me-1"></i> Add First Chain
//               </button>
//             </div>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="ps-4">#</th>
//                     <th>Chain ID</th>
//                     <th>Company Name</th>
//                     <th>GSTN Number</th>
//                     <th>Group</th>
//                     <th>Status</th>
//                     <th>Created At</th>
//                     <th className="text-center pe-4">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {chains.map((chain, index) => (
//                     <tr key={chain.chainId}>
//                       <td className="ps-4 text-muted small">{index + 1}</td>
//                       <td>
//                         <span className="badge bg-primary bg-opacity-15 text-primary fw-semibold">
//                           #{chain.chainId}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="fw-semibold">{chain.companyName}</div>
//                       </td>
//                       <td>
//                         <code className="text-secondary">{chain.gstnNo}</code>
//                       </td>
//                       <td>
//                         <span className="badge bg-secondary bg-opacity-15 text-secondary">
//                           {chain.groupName}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`badge ${chain.isActive ? "bg-success" : "bg-danger"}`}>
//                           {chain.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td className="text-muted small">{chain.createdAt}</td>
//                       <td className="text-center pe-4">
//                         <div className="btn-group btn-group-sm">
//                           <button
//                             className="btn btn-outline-primary"
//                             title="Edit Chain"
//                             onClick={() => navigate(`/chains/edit/${chain.chainId}`)}
//                           >
//                             <i className="bi bi-pencil"></i>
//                           </button>
//                           <button
//                             className="btn btn-outline-danger"
//                             title="Delete Chain"
//                             onClick={() => setDeleteTarget(chain)}
//                           >
//                             <i className="bi bi-trash"></i>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ---- Delete Confirmation Modal ---- */}
//       {deleteTarget && (
//         <>
//           <div className="modal fade show d-block" tabIndex="-1">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content border-0 shadow">
//                 <div className="modal-header border-0 pb-0">
//                   <div className="d-flex align-items-center gap-2">
//                     <div className="bg-danger bg-opacity-15 p-2 rounded-circle">
//                       <i className="bi bi-exclamation-triangle text-danger fs-5"></i>
//                     </div>
//                     <h5 className="modal-title fw-bold mb-0">Confirm Deletion</h5>
//                   </div>
//                 </div>
//                 <div className="modal-body">
//                   <p className="mb-1">Are you sure you want to delete:</p>
//                   <p className="fw-bold text-danger mb-1">
//                     {deleteTarget.companyName}
//                   </p>
//                   <p className="text-muted small">
//                     GSTN: <code>{deleteTarget.gstnNo}</code>
//                   </p>
//                   <div className="alert alert-warning small mb-0 mt-2">
//                     <i className="bi bi-info-circle me-1"></i>
//                     <strong>Note:</strong> This chain cannot be deleted if it has active brands linked to it.
//                     The deletion will fail with an appropriate message in that case.
//                   </div>
//                 </div>
//                 <div className="modal-footer border-0 pt-0">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setDeleteTarget(null)}
//                     disabled={deleting}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={handleDelete}
//                     disabled={deleting}
//                   >
//                     {deleting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-1"></span>
//                         Deleting...
//                       </>
//                     ) : (
//                       <>
//                         <i className="bi bi-trash me-1"></i> Yes, Delete
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="modal-backdrop fade show"></div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChainDashboard;

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://codeb-internal-management-system.onrender.com/api";

const ChainDashboard = () => {
  const navigate = useNavigate();
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    gstnNo: "",
    groupId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, []);

  // Load groups
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API_BASE}/groups/active`);
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load chains
  const fetchChains = async () => {
    try {
      // const res = await axios.get(`${API_BASE}/chains`);
      const res = await chainService.getAllChains();
      setChains(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchChains();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.companyName || !form.gstnNo || !form.groupId) {
      alert("All fields are required");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/chains/${editingId}`, form);
        alert("Updated successfully");
      } else {
        await axios.post(`${API_BASE}/chains`, form);
        alert("Added successfully");
      }

      setForm({ companyName: "", gstnNo: "", groupId: "" });
      setEditingId(null);
      fetchChains();
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  // Edit
  const handleEdit = (chain) => {
    setForm({
      companyName: chain.companyName,
      gstnNo: chain.gstnNo,
      groupId: chain.groupId,
    });
    setEditingId(chain.chainId);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_BASE}/chains/${id}`);
      alert("Deleted successfully");
      fetchChains();
    } catch (err) {
      alert(err.response?.data?.message || "Cannot delete");
    }
  };

  // Filter
  const filteredChains = selectedGroup
    ? chains.filter((c) => c.groupId === Number(selectedGroup))
    : chains;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Chain Management</h2>

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>{editingId ? "Update Chain" : "Add Chain"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="GSTN Number"
                  name="gstnNo"
                  value={form.gstnNo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <select
                  className="form-control"
                  name="groupId"
                  value={form.groupId}
                  onChange={handleChange}
                >
                  <option value="">Select Group</option>
                  {groups.map((g) => (
                    <option key={g.groupId} value={g.groupId}>
                      {g.groupName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="btn btn-primary mt-3">
              {editingId ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>

      {/* FILTER */}
      <div className="mb-3">
        <select
          className="form-control w-25"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="">Filter by Group</option>
          {groups.map((g) => (
            <option key={g.groupId} value={g.groupId}>
              {g.groupName}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>GSTN</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredChains.map((c) => (
            <tr key={c.chainId}>
              <td>{c.chainId}</td>
              <td>{c.companyName}</td>
              <td>{c.gstnNo}</td>
              <td>{c.groupName}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(c.chainId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChainDashboard;
