import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getInvoices,
  deleteInvoice as deleteInvoiceApi,
  downloadInvoice,
  updateInvoiceEmail,
} from "../api/invoiceService";

export default function InvoiceDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getInvoices();
      setData(res.data);
    } catch {
      toast.error("Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  // FIXED DELETE (no recursion)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete invoice?")) return;

    try {
      await deleteInvoiceApi(id);
      setData((prev) => prev.filter((inv) => inv.id !== id));
      toast.success("Invoice deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await downloadInvoice(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch {
      toast.error("Download failed");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateInvoiceEmail(editId, newEmail);
      toast.success("Email updated");
      fetchData();
      setEditId(null);
    } catch {
      toast.error("Update failed");
    }
  };

  // SEARCH (frontend filter)
  const filteredData = data.filter((i) =>
    `${i.invoiceNo} ${i.estimatedId} ${i.chainId} ${i.emailId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>Invoices</h3>

      <input
        className="form-control mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <div className="text-center">
          <div className="spinner-border"></div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Estimate ID</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((i) => (
              <tr key={i.id}>
                <td>{i.invoiceNo}</td>
                <td>{i.estimatedId}</td>
                <td>{i.emailId}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleDownload(i.id)}
                  >
                    Download
                  </button>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditId(i.id);
                      setNewEmail(i.emailId);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(i.id)}
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
      {editId && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Email</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}