import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2>Dashboard</h2>

        <p>
          Welcome! Your role:{" "}
          <strong>{user?.role || "Not available"}</strong>
        </p>

        {user?.role === "ADMIN" && (
          <div className="alert alert-success">
            Admin Access Enabled
          </div>
        )}

        {user?.role === "USER" && (
          <div className="alert alert-info">
            Sales Access Enabled
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;