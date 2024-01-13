import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect, useState } from "react";

export default function AuthWrapper() {
    const [authState, setAuthState] = useAuth()

    const validateToken = useCallback(async () => {
        try {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${authState.token}`)
            
            const authValidateResponse = await fetch("/api/auth/validate", {
                method: "POST",
                headers: headers,
                credentials: "include"
            })

            const authValidateResponseJSON = await authValidateResponse.json()
            console.log(`Token validation ${authValidateResponseJSON.token}`)

            console.log(authValidateResponseJSON)

            setAuthState({
                uid: authValidateResponseJSON.uid,
                token: authValidateResponseJSON.token,
                verified: true
            })
        } catch (err) {
            console.error(err.message)
        }
    }, [authState.token, setAuthState])

    useEffect(() => {
        validateToken()
    }, [validateToken])

    if (authState.verified) {
        if (!authState.token) {
            return <Navigate to="/" replace />
        }
        return <Outlet />
    } else {
        return <p class="loading">Verifying authentication...</p>
    }
}