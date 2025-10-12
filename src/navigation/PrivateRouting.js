// PrivateRouting.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, adminOnly = false }) {
  const user = useSelector((state) => state.auth.User);

  if (!user) {
    return <Navigate to="/login" />;
  }
 const ADMIN_EMAIL = "Admin@gmail.com"; // Replace with your admin email
  // Check if route is admin-only and user email doesn't match admin email
  if (adminOnly && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" />;
  }

  return children;
}