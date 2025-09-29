 
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function PublicRoute({children}) {
    const user = useSelector((state) => state.auth.User);
    console.log("User in PublicRoute", user);
  return  (
    user? <Navigate to="/" /> : children
  )
}