import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function AuthWrapper() {
    const [authState, setAuthState] = useAuth()

    // TODO: add token expiry check

    if (!authState.token) {
        return <Navigate to="/" replace />
    }
    return <Outlet />
}