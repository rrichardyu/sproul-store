import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function AuthWrapper() {
    const [authState, setAuthState] = useAuth()

    const restoreSession = () => {
        const uid = localStorage.getItem("uid")
        const token = localStorage.getItem("token")

        if (token) {
            setAuthState({
                uid: uid,
                token: token
            })
        }
    }

    useEffect(() => {
        restoreSession()
    }, [])

    // TODO: add token expiry check

    return (
        authState.token ? <Outlet /> : <Navigate to="/" replace />
    )
}