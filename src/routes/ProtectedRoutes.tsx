import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoutes = () => {
    const { user } = useAuth();
    console.log(user)

    return user ? <Outlet/> : <Navigate to="/login" />
}