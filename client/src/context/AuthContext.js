import React, { useState, useEffect, useContext } from "react"

export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const [authState, setAuthState] = useState({
        uid: null,
        token: null,
        verified: false
    })

    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    )
}