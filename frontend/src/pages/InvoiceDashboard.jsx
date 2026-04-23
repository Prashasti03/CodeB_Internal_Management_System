import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  getInvoices,
  deleteInvoice,
  downloadInvoice,
} from "../api/invoiceService";

export default function InvoiceDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getInvoices();
    setData(res.data);
  };

  const deleteInvoice = async (id) => {
    if (window.confirm("Delete invoice?")) {
      await deleteInvoice(id);
      fetchData();
    }
  };

  const handleDownload = async (id) => {
    const res = await downloadInvoice(id);

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "invoice-${id}.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="container mt-4">
      <h3>Invoices</h3>

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
          {data.map((i) => (
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
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteInvoice(i.id)}
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
