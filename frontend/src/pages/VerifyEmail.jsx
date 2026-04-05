import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying...");
  const token = params.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify?token=${token}`);
        setMessage("Email verified successfully!");

        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setMessage("Verification failed or token expired");
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className="container text-center mt-5">
      <h3>{message}</h3>
    </div>
  );
};

export default VerifyEmail;