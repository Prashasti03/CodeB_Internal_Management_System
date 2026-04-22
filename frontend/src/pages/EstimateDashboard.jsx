import React, { useEffect, useState } from "react";
import {
  getEstimates,
  createEstimate,
  updateEstimate,
  deleteEstimate,
} from "../api/estimateService";

const EstimateDashboard = () => {
  const [estimates, setEstimates] = useState([]);
  const [form, setForm] = useState({
    chainId: "",
    groupName: "",
    brandName: "",
    zoneName: "",
    service: "",
    qty: "",
    costPerUnit: "",
    deliveryDate: "",
    deliveryDetails: "",
  });

  const [editId, setEditId] = useState(null);

  // FETCH DATA
  const fetchData = async () => {
    const res = await getEstimates();
    setEstimates(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateEstimate(editId, form);
      setEditId(null);
    } else {
      await createEstimate(form);
    }

    setForm({
      chainId: "",
      groupName: "",
      brandName: "",
      zoneName: "",
      service: "",
      qty: "",
      costPerUnit: "",
      deliveryDate: "",
      deliveryDetails: "",
    });

    fetchData();
  };

  // EDIT
  const handleEdit = (est) => {
    setForm(est);
    setEditId(est.estimatedId);
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await deleteEstimate(id);
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h2>Estimate Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row">
          <div className="col-md-3">
            <input
              className="form-control"
              name="chainId"
              placeholder="Chain ID"
              value={form.chainId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              name="groupName"
              placeholder="Group Name"
              value={form.groupName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              name="brandName"
              placeholder="Brand Name"
              value={form.brandName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              name="zoneName"
              placeholder="Zone Name"
              value={form.zoneName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-3">
            <input
              className="form-control"
              name="service"
              placeholder="Service"
              value={form.service}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="qty"
              placeholder="Qty"
              value={form.qty}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              name="costPerUnit"
              placeholder="Cost/Unit"
              value={form.costPerUnit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="deliveryDate"
              value={form.deliveryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <input
            className="form-control"
            name="deliveryDetails"
            placeholder="Delivery Details"
            value={form.deliveryDetails}
            onChange={handleChange}
          />
        </div>
      </form>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Chain</th>
            <th>Service</th>
            <th>Qty</th>
            <th>Cost</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {estimates.map((e) => (
            <tr key={e.estimatedId}>
              <td>{e.estimatedId}</td>
              <td>{e.chainId}</td>
              <td>{e.service}</td>
              <td>{e.qty}</td>
              <td>{e.costPerUnit}</td>
              <td>{e.totalCost}</td>
              <td>{e.deliveryDate}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(e)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(e.estimatedId)}
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

export default EstimateDashboard;