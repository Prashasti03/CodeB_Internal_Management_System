import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GroupDashboard from "./pages/GroupDashboard";
import ChainDashboard from "./pages/ChainDashboard";
import ChainForm from "./pages/ChainForm";
import BrandDashboard from "./pages/BrandDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/groups" element={<GroupDashboard />} />
        <Route path="/chains" element={<ChainDashboard />} />
        <Route path="/brands" element={<BrandDashboard />} />
        {/* <Route path="/chains/add" element={<ChainForm />} /> */}
        {/* <Route path="/chains/edit/:id" element={<ChainForm />} /> */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
