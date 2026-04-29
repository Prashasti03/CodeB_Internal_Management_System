import { useParams } from "react-router-dom";
import { useState } from "react";
import { generateInvoice } from "../api/invoiceService";
import { toast } from "react-toastify";

export default function GenerateInvoice() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);
      await generateInvoice(id, email);
      toast.success("Invoice Generated & Email Sent!");
      setEmail("");
    } catch (err) {
      toast.error("Failed to generate invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Generate Invoice</h3>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border"></div>
        </div>
      )}

      <button className="btn btn-primary" onClick={handleGenerate}>
        Generate Invoice
      </button>
    </div>
  );
}