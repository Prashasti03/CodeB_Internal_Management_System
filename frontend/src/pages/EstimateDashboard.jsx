// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import {
//   getEstimates,
//   createEstimate,
//   updateEstimate,
//   deleteEstimate,
// } from "../api/estimateService";

// const EstimateDashboard = () => {
//   const navigate = useNavigate();
//   const [estimates, setEstimates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     chainId: "",
//     groupName: "",
//     brandName: "",
//     zoneName: "",
//     service: "",
//     qty: "",
//     costPerUnit: "",
//     deliveryDate: "",
//     deliveryDetails: "",
//   });

//   const [editId, setEditId] = useState(null);
//   const [chains, setChains] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [groups, setGroups] = useState([]);

//   // FETCH DATA
//   const fetchData = async () => {
//     const res = await getEstimates();
//     setEstimates(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//     fetchDropdowns();
//   }, []);

//   const fetchDropdowns = async () => {
//     const [c, b, z, g] = await Promise.all([
//       getChains(),
//       getBrands(),
//       getZones(),
//       getGroups(),
//     ]);

//     setChains(c.data);
//     setBrands(b.data);
//     setZones(z.data);
//     setGroups(g.data);
//   };

//   // HANDLE INPUT
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editId) {
//       // await updateEstimate(editId, form);
//       // setEditId(null);
//       try {
//         await updateEstimate(editId, form);
//         setEditId(null);
//         toast.success("Estimate updated successfully");
//       } catch (err) {
//         toast.error("Something went wrong");
//       }
//     } else {
//       // await createEstimate(form);
//       try {
//         await createEstimate(form);
//         toast.success("Estimate created successfully");
//       } catch (err) {
//         toast.error("Something went wrong");
//       }
//     }

//     setForm({
//       chainId: "",
//       groupName: "",
//       brandName: "",
//       zoneName: "",
//       service: "",
//       qty: "",
//       costPerUnit: "",
//       deliveryDate: "",
//       deliveryDetails: "",
//     });

//     fetchData();
//   };

//   // EDIT
//   const handleEdit = (est) => {
//     setForm(est);
//     setEditId(est.estimatedId);
//   };

//   // DELETE
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     if (!confirmDelete) return;

//     try {
//       await deleteEstimate(id);
//       fetchData();
//       toast.success("Estimate deleted successfully");
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Estimate Management</h2>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="card p-3 mb-4">
//         <div className="row">
//           <div className="col-md-3">
//             <select
//               className="form-control"
//               name="chainId"
//               value={form.chainId}
//               onChange={(e) => {
//                 const selected = chains.find(
//                   (c) => c.chainId == e.target.value,
//                 );
//                 setForm({
//                   ...form,
//                   chainId: selected.chainId,
//                   chainName: selected.companyName,
//                 });
//               }}
//               required
//             >
//               <option value="">Select Chain</option>
//               {chains.map((c) => (
//                 <option key={c.chainId} value={c.chainId}>
//                   {c.companyName} (ID: {c.chainId})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-3">
//             <select
//               className="form-control"
//               name="groupName"
//               value={form.groupName}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Group</option>
//               {groups.map((g) => (
//                 <option key={g.groupId}>{g.groupName}</option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-3">
//             <select
//               className="form-control"
//               name="brandName"
//               value={form.brandName}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Brand</option>
//               {brands.map((b) => (
//                 <option key={b.brandId}>{b.brandName}</option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-3">
//             <select
//               className="form-control"
//               name="zoneName"
//               value={form.zoneName}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Zone</option>
//               {zones.map((z) => (
//                 <option key={z.zoneId}>{z.zoneName}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="row mt-2">
//           <div className="col-md-3">
//             <input
//               className="form-control"
//               name="service"
//               placeholder="Service"
//               value={form.service}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="col-md-2">
//             <input
//               type="number"
//               className="form-control"
//               name="qty"
//               placeholder="Qty"
//               value={form.qty}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="col-md-2">
//             <input
//               type="number"
//               className="form-control"
//               name="costPerUnit"
//               placeholder="Cost/Unit"
//               value={form.costPerUnit}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="col-md-3">
//             <label>Deliver Date: </label>
//             <input
//               type="date"
//               className="form-control"
//               name="deliveryDate"
//               value={form.deliveryDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mt-2">
//             <input
//               className="form-control"
//               name="deliveryDetails"
//               placeholder="Delivery Details"
//               value={form.deliveryDetails}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-md-2">
//             <button className="btn btn-primary w-100">
//               {editId ? "Update" : "Add"}
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* TABLE */}
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Chain ID</th>
//             <th>Service</th>
//             <th>Qty</th>
//             <th>Cost</th>
//             <th>Total</th>
//             <th>Delivery</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {estimates.map((est) => (
//             <tr key={est.estimatedId}>
//               <td>{est.estimatedId}</td>
//               <td>{est.chainId}</td>
//               <td>{est.service}</td>
//               <td>{est.qty}</td>
//               <td>{est.costPerUnit}</td>
//               <td>{est.totalCost}</td>
//               <td>{est.deliveryDate}</td>

//               <td>
//                 <button
//                   className="btn btn-warning btn-sm me-2"
//                   onClick={() => handleEdit(est)}
//                 >
//                   Edit
//                 </button>

//                 <button
//                   className="btn btn-danger btn-sm me-2"
//                   onClick={() => handleDelete(est.estimatedId)}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   className="btn btn-success btn-sm"
//                   onClick={() =>
//                     navigate(`/generate-invoice/${est.estimatedId}`)
//                   }
//                 >
//                   Generate Invoice
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EstimateDashboard;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getEstimates,
  createEstimate,
  updateEstimate,
  deleteEstimate,
  getChains,
  getBrands,
  getZones,
  getGroups,
} from "../api/estimateService";

const EstimateDashboard = () => {
  const navigate = useNavigate();

  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    chainId: "",
    chainName: "",
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

  const [chains, setChains] = useState([]);
  const [brands, setBrands] = useState([]);
  const [zones, setZones] = useState([]);
  const [groups, setGroups] = useState([]);

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getEstimates();
      setEstimates(res.data);
    } catch (err) {
      toast.error("Failed to load estimates");
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdowns = async () => {
    try {
      const [c, b, z, g] = await Promise.all([
        getChains(),
        getBrands(),
        getZones(),
        getGroups(),
      ]);

      setChains(c.data);
      setBrands(b.data);
      setZones(z.data);
      setGroups(g.data);
    } catch (err) {
      toast.error("Failed to load dropdowns");
    }
  };

  useEffect(() => {
    fetchData();
    fetchDropdowns();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // TOTAL COST
  const total = form.qty && form.costPerUnit
    ? form.qty * form.costPerUnit
    : 0;

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.chainId || !form.service || !form.qty || !form.costPerUnit) {
      toast.error("Please fill all required fields");
      return;
    }

    if (form.qty <= 0 || form.costPerUnit <= 0) {
      toast.error("Values must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await updateEstimate(editId, form);
        toast.success("Estimate updated");
        setEditId(null);
      } else {
        await createEstimate(form);
        toast.success("Estimate created");
      }

      setForm({
        chainId: "",
        chainName: "",
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

    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // EDIT
  const handleEdit = (est) => {
    setForm(est);
    setEditId(est.estimatedId);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      setLoading(true);
      await deleteEstimate(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // FILTER
  const filtered = estimates.filter((e) =>
    e.chainName?.toLowerCase().includes(search.toLowerCase()) ||
    e.service?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Estimate Management</h2>

      {/* SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search by chain or service"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-2">

          {/* CHAIN */}
          <div className="col-12 col-md-3">
            <select
              className="form-control"
              value={form.chainId}
              onChange={(e) => {
                const selected = chains.find(
                  (c) => c.chainId == e.target.value
                );
                setForm({
                  ...form,
                  chainId: selected.chainId,
                  chainName: selected.companyName,
                });
              }}
              required
            >
              <option value="">Select Chain</option>
              {chains.map((c) => (
                <option key={c.chainId} value={c.chainId}>
                  {c.companyName} (ID: {c.chainId})
                </option>
              ))}
            </select>
          </div>

          {/* GROUP */}
          <div className="col-12 col-md-3">
            <select
              className="form-control"
              name="groupName"
              value={form.groupName}
              onChange={handleChange}
              required
            >
              <option value="">Select Group</option>
              {groups.map((g) => (
                <option key={g.groupId}>{g.groupName}</option>
              ))}
            </select>
          </div>

          {/* BRAND */}
          <div className="col-12 col-md-3">
            <select
              className="form-control"
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              required
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b.brandId}>{b.brandName}</option>
              ))}
            </select>
          </div>

          {/* ZONE */}
          <div className="col-12 col-md-3">
            <select
              className="form-control"
              name="zoneName"
              value={form.zoneName}
              onChange={handleChange}
              required
            >
              <option value="">Select Zone</option>
              {zones.map((z) => (
                <option key={z.zoneId}>{z.zoneName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-2 mt-2">

          <div className="col-12 col-md-3">
            <input
              className={`form-control ${!form.service && "is-invalid"}`}
              name="service"
              placeholder="Service"
              value={form.service}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 col-md-2">
            <input
              type="number"
              min="1"
              className="form-control"
              name="qty"
              placeholder="Qty"
              value={form.qty}
              onChange={handleChange}
            />
          </div>

          <div className="col-6 col-md-2">
            <input
              type="number"
              min="1"
              className="form-control"
              name="costPerUnit"
              placeholder="Cost/Unit"
              value={form.costPerUnit}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-2">
            <input
              className="form-control"
              value={total}
              disabled
              placeholder="Total"
            />
          </div>

          <div className="col-12 col-md-3">
            <input
              type="date"
              className="form-control"
              name="deliveryDate"
              value={form.deliveryDate}
              onChange={handleChange}
              required
            />
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

        <button className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Processing..." : editId ? "Update" : "Add"}
        </button>
      </form>

      {/* LOADING */}
      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border"></div>
        </div>
      )}

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Chain ID</th>
              <th>Chain Name</th>
              <th>Service</th>
              <th>Qty</th>
              <th>Cost</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((est) => (
              <tr key={est.estimatedId}>
                <td>{est.estimatedId}</td>
                <td>{est.chainId}</td>
                <td>{est.chainName}</td>
                <td>{est.service}</td>
                <td>{est.qty}</td>
                <td>{est.costPerUnit}</td>
                <td>{est.totalCost}</td>
                <td>{est.deliveryDate}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(est)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(est.estimatedId)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      navigate(`/generate-invoice/${est.estimatedId}`)
                    }
                  >
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstimateDashboard;