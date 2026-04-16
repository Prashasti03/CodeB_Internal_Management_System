import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import chainService from "../api/chainService";
import { getActiveGroups } from "../api/groupService";

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
  const [error, setError] = useState("");

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch groups (AXIOS → res.data)
  const fetchGroups = async () => {
    try {
      const res = await getActiveGroups();
      setGroups(res.data);
    } catch (err) {
      setError("Failed to load groups");
    }
  };

  // Fetch chains (FETCH → direct data)
  const fetchChains = async () => {
  try {
    const res = await chainService.getAllChains();
    console.log("CHAINS:", res.data); 
    setChains(res.data); 
  } catch (err) {
    console.error(err);
    setError("Failed to load chains");
  }
};

  useEffect(() => {
    fetchGroups();
    fetchChains();
  }, []);

  // Form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.companyName || !form.gstnNo || !form.groupId) {
      setError("All fields are required");
      return;
    }

    try {
      if (editingId) {
        await chainService.updateChain(editingId, form);
        alert("Updated successfully");
      } else {
        await chainService.addChain(form);
        alert("Added successfully");
        console.log("CHAINS:", res.data);
      }

      setForm({ companyName: "", gstnNo: "", groupId: "" });
      setEditingId(null);
      fetchChains();
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred"); 
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
      await chainService.deleteChain(id);
      alert("Deleted successfully");
      fetchChains();
    } catch (err) {
      setError(err.response?.data?.message || "Cannot delete");
    }
  };

  // Filter
  const filteredChains = selectedGroup
    ? chains.filter((c) => c.groupId === Number(selectedGroup))
    : chains;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Chain Management</h2>

      {error && <div className="alert alert-danger">{error}</div>}

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
          {filteredChains.length > 0 ? (
            filteredChains.map((c) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No chains found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChainDashboard;