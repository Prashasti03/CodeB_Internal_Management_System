import { useEffect, useState } from "react";
import axios from "axios";

export default function BrandDashboard() {

  const API = "https://codeb-internal-management-system.onrender.com/api";

  const [brands, setBrands] = useState([]);
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedChain, setSelectedChain] = useState("");

  const [brandName, setBrandName] = useState("");
  const [chainId, setChainId] = useState("");

  const [editBrand, setEditBrand] = useState(null);

  useEffect(() => {
    fetchGroups();
    fetchChains();
    fetchBrands();
  }, []);

  // ================= FETCH =================

  const fetchGroups = async () => {
    const res = await axios.get(`${API}/groups`);
    setGroups(res.data);
  };

  const fetchChains = async () => {
    const res = await axios.get(`${API}/chains`);
    setChains(res.data);
  };

  const fetchBrands = async () => {
    const res = await axios.get(`${API}/brands`);
    setBrands(res.data);
  };

  // ================= FILTER =================

  const handleGroupFilter = async (groupId) => {
    setSelectedGroup(groupId);
    setSelectedChain("");

    if (!groupId) {
      fetchChains();
      fetchBrands();
      return;
    }

    const res = await axios.get(`${API}/chains/group/${groupId}`);
    setChains(res.data);
    setBrands([]);
  };

  const handleChainFilter = async (chainId) => {
    setSelectedChain(chainId);

    if (!chainId) {
      fetchBrands();
      return;
    }

    const res = await axios.get(`${API}/brands/chain/${chainId}`);
    setBrands(res.data);
  };

  // ================= ADD =================

  const addBrand = async () => {
    if (!brandName || !chainId) {
      alert("Fill all fields");
      return;
    }

    await axios.post(`${API}/brands`, {
      brandName,
      chainId
    });

    setBrandName("");
    fetchBrands();
  };

  // ================= DELETE =================

  const deleteBrand = async (id) => {
    if (!window.confirm("Delete this brand?")) return;

    await axios.delete(`${API}/brands/${id}`);
    fetchBrands();
  };

  // ================= UPDATE =================

  const openEdit = (brand) => {
    setEditBrand(brand);
  };

  const updateBrand = async () => {
    await axios.put(`${API}/brands/${editBrand.brandId}`, {
      brandName: editBrand.brandName,
      chainId: editBrand.chainId
    });

    setEditBrand(null);
    fetchBrands();
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Brand Management</h2>

      {/* FILTER SECTION */}
      <div className="card p-3 mb-4">
        <div className="row">

          <div className="col-md-6">
            <label>Filter by Group</label>
            <select
              className="form-control"
              onChange={(e) => handleGroupFilter(e.target.value)}
            >
              <option value="">All Groups</option>
              {groups.map(g => (
                <option key={g.groupId} value={g.groupId}>
                  {g.groupName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label>Filter by Company</label>
            <select
              className="form-control"
              onChange={(e) => handleChainFilter(e.target.value)}
            >
              <option value="">All Companies</option>
              {chains.map(c => (
                <option key={c.chainId} value={c.chainId}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* ADD BRAND */}
      <div className="card p-3 mb-4">
        <h5>Add Brand</h5>

        <div className="row">
          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <select
              className="form-control"
              onChange={(e) => setChainId(e.target.value)}
            >
              <option>Select Company</option>
              {chains.map(c => (
                <option key={c.chainId} value={c.chainId}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={addBrand}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card p-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map(b => (
              <tr key={b.brandId}>
                <td>{b.brandId}</td>
                <td>{b.brandName}</td>
                <td>{b.companyName}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openEdit(b)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteBrand(b.brandId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editBrand && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">

              <h5>Edit Brand</h5>

              <input
                className="form-control mb-2"
                value={editBrand.brandName}
                onChange={(e) =>
                  setEditBrand({ ...editBrand, brandName: e.target.value })
                }
              />

              <select
                className="form-control mb-2"
                value={editBrand.chainId}
                onChange={(e) =>
                  setEditBrand({ ...editBrand, chainId: e.target.value })
                }
              >
                {chains.map(c => (
                  <option key={c.chainId} value={c.chainId}>
                    {c.companyName}
                  </option>
                ))}
              </select>

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setEditBrand(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={updateBrand}
                >
                  Update
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}