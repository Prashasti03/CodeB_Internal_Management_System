import { useEffect, useState } from "react";
import { getZones, createZone, deleteZone } from "../api/zoneService.js";
// import { getBrands } from "../api/brandService.js";
import {getBrands} from "../api/brandService.js"

function ZoneDashboard() {
  const [zones, setZones] = useState([]);
  const [brands, setBrands] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [brandId, setBrandId] = useState("");

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

        <button className="btn btn-primary" onClick={handleAdd}>
          Add Zone
        </button>
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