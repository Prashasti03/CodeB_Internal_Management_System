// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { logout, user } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <span
//           className="navbar-brand"
//           style={{ cursor: "pointer" }}
//           onClick={() => navigate("/dashboard")}
//         >
//           IMS
//         </span>

//         {/* Mobile Toggle */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Collapsible Menu */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             {!user ? (
//               <>
//                 <li className="nav-item">
//                   <span
//                     className="nav-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => navigate("/login")}
//                   >
//                     Login
//                   </span>
//                 </li>

//                 <li className="nav-item">
//                   <span
//                     className="nav-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => navigate("/register")}
//                   >
//                     Register
//                   </span>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <span className="nav-link">
//                     {/* {user?.role === "ADMIN" ? "Admin" : "User"} */}
//                     {user?.role}
//                   </span>
//                 </li>

//                 <li className="nav-item">
//                   <span
//                     className="nav-link"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => navigate("/dashboard")}
//                   >
//                     Dashboard
//                   </span>
//                 </li>

//                 <li className="nav-item">
//                   <span
//                     className="nav-link text-danger"
//                     style={{ cursor: "pointer" }}
//                     onClick={logout}
//                   >
//                     Logout
//                   </span>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          IMS
        </span>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {!user ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => navigate("/login")}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </span>
                </li>

                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => navigate("/register")}
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </span>
                </li>
              </>
            ) : (
              <>
                {/* Role Badge */}
                <li className="nav-item me-3">
                  <span className="badge bg-info text-dark p-2">
                    {user?.role}
                  </span>
                </li>

                {/* Dashboard */}
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => navigate("/dashboard")}
                    style={{ cursor: "pointer" }}
                  >
                    Dashboard
                  </span>
                </li>

                {/* Admin Link */}
                {user?.role === "ADMIN" && (
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={() => navigate("/groups")}
                      style={{ cursor: "pointer" }}
                    >
                      Groups
                    </span>
                  </li>
                )}

                {/* Admin Link */}
                {user?.role === "ADMIN" && (
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={() => navigate("/chains")}
                      style={{ cursor: "pointer" }}
                    >
                      Chains
                    </span>
                  </li>
                )}

                {/* Admin Link */}
                {user?.role === "ADMIN" && (
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={() => navigate("/brands")}
                      style={{ cursor: "pointer" }}
                    >
                      Brands
                    </span>
                  </li>
                )}

                {/* Admin Link */}
                {user?.role === "ADMIN" && (
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={() => navigate("/zones")}
                      style={{ cursor: "pointer" }}
                    >
                      Zones
                    </span>
                  </li>
                )}

                {/* {user?.role === "ADMIN" || user?.role === "SALES" && (
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={() => navigate("/estimates")}
                      style={{ cursor: "pointer" }}
                    >
                      Estimates
                    </span>
                  </li>
                )} */}

                
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={() => navigate("/estimates")}
                      style={{ cursor: "pointer" }}
                    >
                      Estimates
                    </span>
                  </li>

                  <li className="nav-item">
                    <span
                      className="nav-link"
                      onClick={() => navigate("/invoices")}
                      style={{ cursor: "pointer" }}
                    >
                      Invoices
                    </span>
                  </li>
                

                {/* Logout */}
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-danger ms-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
