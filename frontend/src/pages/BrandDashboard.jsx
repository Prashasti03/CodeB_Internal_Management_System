import { useEffect, useState } from "react";
import axios from "axios";

export default function BrandDashboard() {

  const [brands, setBrands] = useState([]);
  const [chains, setChains] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [chainId, setChainId] = useState("");

  const API = "https://codeb-internal-management-system.onrender.com/api";

  useEffect(() => {
    fetchChains();
    fetchBrands();
  }, []);

  const fetchChains = async () => {
    const res = await axios.get(`${API}/chains`);
    setChains(res.data);
  };

  const fetchBrands = async () => {
    const res = await axios.get(`${API}/brands`);
    setBrands(res.data);
  };

  const addBrand = async () => {
    await axios.post(`${API}/brands`, {
      brandName,
      chainId
    });

    setBrandName("");
    fetchBrands();
  };

  const deleteBrand = async (id) => {
    await axios.delete(`${API}/brands/${id}`);
    fetchBrands();
  };

  return (
    <div className="container mt-4">
      <h2>Brand Management</h2>

      <div className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />

        <select
          className="form-control mb-2"
          onChange={(e) => setChainId(e.target.value)}
        >
          <option>Select Company</option>
          {chains.map(c => (
            <option key={c.chainId} value={c.chainId}>
              {c.companyName}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={addBrand}>
          Add Brand
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {brands.map(b => (
            <tr key={b.brandId}>
              <td>{b.brandId}</td>
              <td>{b.brandName}</td>
              <td>{b.chain?.companyName}</td>
              <td>
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
  );
}