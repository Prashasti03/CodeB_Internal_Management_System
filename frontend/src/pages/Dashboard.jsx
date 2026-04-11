// import { useAuth } from "../context/AuthContext";

// const Dashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="container mt-4">
//       <div className="card p-4 shadow">
//         <h2>Dashboard</h2>

//         <p>
//           Welcome! Your role:{" "}
//           <strong>{user?.role || "Not available"}</strong>
//         </p>

//         {user?.role === "ADMIN" && (
//           <div className="alert alert-success">
//             Admin Access Enabled
//           </div>
//         )}

//         {user?.role === "USER" && (
//           <div className="alert alert-info">
//             Sales Access Enabled
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Welcome back 👋</h2>
        <p className="text-muted">
          Logged in as <strong>{user?.role}</strong>
        </p>
      </div>

      {/* Role Badge */}
      <div className="mb-4">
        {user?.role === "ADMIN" && (
          <span className="badge bg-success p-2">Admin Access</span>
        )}
        {user?.role === "USER" && (
          <span className="badge bg-primary p-2">User Access</span>
        )}
      </div>

      {/* Cards Section */}
      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p className="card-text text-muted">
                View and manage your account details.
              </p>
            </div>
          </div>
        </div>

        {/* Groups Card (Admin Only) */}
        {user?.role === "ADMIN" && (
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title">Group Management</h5>
                <p className="card-text text-muted">
                  Create, update and manage groups.
                </p>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => navigate("/groups")}
                >
                  Manage Groups
                </button>
              </div>
            </div>
          </div>
        )}

        {/* General Access */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Activities</h5>
              <p className="card-text text-muted">
                View system activity and updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
