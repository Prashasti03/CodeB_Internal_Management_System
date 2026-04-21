import { useEffect, useState } from "react";
import { getZones, createZone, deleteZone } from "../api/zoneService.js";
// import { getBrands } from "../api/brandService.js";
import { getBrands } from "../api/brandService.js";

function ZoneDashboard() {
  const [zones, setZones] = useState([]);
  const [brands, setBrands] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchZones();
    fetchBrands();
  }, []);

  const fetchZones = async () => {
    const res = await getZones();
    setZones(res.data);
  };

  const fetchBrands = async () => {
    const res = await getBrands();
    setBrands(res.data);
  };

  const handleAdd = async () => {
    if (!zoneName || !brandId) {
      alert("All fields required");
      return;
    }

    await createZone({ zoneName, brandId });
    setZoneName("");
    setBrandId("");
    fetchZones();
  };

  const handleDelete = async (id) => {
    await deleteZone(id);
    fetchZones();
  };

  const handleFilter = async () => {
    const params = new URLSearchParams();

    if (selectedGroup) params.append("groupId", selectedGroup);
    if (selectedChain) params.append("chainId", selectedChain);
    if (selectedBrand) params.append("brandId", selectedBrand);

    const res = await api.get(`/zones/filter?${params.toString()}`);
    setZones(res.data);
  };

  const handleEdit = (zone) => {
    setZoneName(zone.zoneName);
    setBrandId(zone.brandId); // IMPORTANT → you must include brandId in response
    setEditId(zone.zoneId);
  };

  const handleSubmit = async () => {
    if (!zoneName || !brandId) return alert("All fields required");

    if (editId) {
      await updateZone(editId, { zoneName, brandId });
    } else {
      await createZone({ zoneName, brandId });
    }

    setEditId(null);
    setZoneName("");
    setBrandId("");
    fetchZones();
  };

  return (
    <div className="container mt-4">
      <h3>Zone Management</h3>

      <div className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Zone Name"
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brands.map((b) => (
            <option key={b.brandId} value={b.brandId}>
              {b.brandName}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={handleSubmit}>
          {editId ? "Update Zone" : "Add Zone"}
        </button>
      </div>

      <div className="row mb-3">
        <div className="col">
          <select
            className="form-control"
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

        <div className="col">
          <select
            className="form-control"
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="">Filter by Company</option>
            {chains.map((c) => (
              <option key={c.chainId} value={c.chainId}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <select
            className="form-control"
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Filter by Brand</option>
            {brands.map((b) => (
              <option key={b.brandId} value={b.brandId}>
                {b.brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <button className="btn btn-primary w-100" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Zone</th>
            <th>Brand</th>
            <th>Company</th>
            <th>Group</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((z) => (
            <tr key={z.zoneId}>
              <td>{z.zoneName}</td>
              <td>{z.brandName}</td>
              <td>{z.companyName}</td>
              <td>{z.groupName}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(z)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(z.zoneId)}
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
}

export default ZoneDashboard;
