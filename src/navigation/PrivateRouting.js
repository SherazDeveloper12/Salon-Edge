import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({children}) {
    const user = useSelector((state) => state.auth.User);
    console.log("User in PrivateRoute", user);
  return (
    user? children : <Navigate to="/login" />
  )
}