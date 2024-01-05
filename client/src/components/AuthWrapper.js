import { Navigate, Outlet } from "react-router-dom";

export default function AuthWrapper() {
    // TODO: add token expiry check
    return (
        !localStorage.getItem("token")
        ? <Navigate to="/" replace />
        : <Outlet />
    )
}