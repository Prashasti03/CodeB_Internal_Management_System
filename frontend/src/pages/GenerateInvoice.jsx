import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";
import { generateInvoice } from "../api/invoiceService";

export default function GenerateInvoice() {
  const { id } = useParams();
  const [email, setEmail] = useState("");

  const handleGenerate = async () => {
    await generateInvoice(id, email);
    alert("Invoice Generated!");
  };

  return (
    <div className="container mt-4">
      <h3>Generate Invoice</h3>

      <input
        className="form-control mb-3"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleGenerate}>
        Generate Invoice
      </button>
    </div>
  );
}