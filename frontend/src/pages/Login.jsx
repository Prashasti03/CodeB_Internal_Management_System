import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data;

      login(token);
      setSuccess("Login successful!");

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data || "Login failed";

      setError(message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {/* <div className="card p-4 shadow" style={{ width: "400px" }}> */}
      <div className="card p-4 shadow col-12 col-sm-10 col-md-6 col-lg-4">
        <h3 className="text-center mb-3">Login</h3>

        {/* Alerts */}
        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer", fontWeight: "500" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

        <p className="text-center mt-3">
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        <p className="text-center text-muted">
          Please verify your email before login
        </p>
      </div>
    </div>
  );
};

export default Login;
