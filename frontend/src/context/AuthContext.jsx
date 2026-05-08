// import { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState(null);

//   // Decode token when app loads
//   useEffect(() => {
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUser(decoded);
//     }
//   }, [token]);

//   const login = (newToken) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);

//     const decoded = jwtDecode(newToken);
//     setUser(decoded); 
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }

//   return context;
// };

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Check token validity
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);

      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // Restore session on refresh
  useEffect(() => {

    if (token) {

      // Logout if token expired
      if (isTokenExpired(token)) {
        logout();
        return;
      }

      const decoded = jwtDecode(token);

      setUser(decoded);

      // Auto logout when token expires
      const expiryTime = decoded.exp * 1000 - Date.now();

      const timer = setTimeout(() => {
        logout();
        window.location.href = "/login";
      }, expiryTime);

      return () => clearTimeout(timer);
    }

  }, [token]);

  // Login
  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);

    const decoded = jwtDecode(newToken);

    setUser(decoded);
  };

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};