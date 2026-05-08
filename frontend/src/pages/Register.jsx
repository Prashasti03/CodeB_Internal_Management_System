import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);

    try {
      await api.post("/auth/register", form);

      setSuccess("Registration successful! Please verify your email.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow col-12 col-sm-10 col-md-6 col-lg-4">
        <h3 className="text-center mb-3">Register</h3>

        {success && (
          <Toast
            message={success}
            type="success"
            onClose={() => setSuccess("")}
          />
        )}

        {error && (
          <Toast message={error} type="danger" onClose={() => setError("")} />
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            className="form-control mb-2"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control mb-2"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-2"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="form-select mb-3"
            onChange={handleChange}
          >
            <option value="USER">Sales</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
