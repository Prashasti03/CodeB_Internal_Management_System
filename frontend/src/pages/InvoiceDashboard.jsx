import { useEffect, useState } from "react";
import { getInvoices, deleteInvoice } from "../api/invoiceService";

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
                  className="btn btn-danger"
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