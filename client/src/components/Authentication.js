import React, { useState } from "react"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Authentication() {
    const [user, setUser] = useState({})
    const [signedIn, setSignedIn] = useState(false)
    const navigate = useNavigate()
    const [authState, setAuthState] = useAuth()

    const authenticate = async (payload) => {
        try {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            
            const authResponse = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    authToken: payload.credential
                }),
                headers: headers
            })

            const authResponseJSON = await authResponse.json()
            console.log(authResponseJSON)
            setUser(authResponseJSON)
            localStorage.setItem("user", JSON.stringify(authResponseJSON))

            const newAuthState = {
                uid: authResponseJSON.uid,
                token: authResponseJSON.token,
                verified: true
            }

            setAuthState(newAuthState)
            localStorage.setItem("uid", newAuthState.uid)
            localStorage.setItem("token", newAuthState.token)

            setSignedIn(true)
            redirect(authResponseJSON)
        } catch (err) {
            console.error(err.message)
        }
    }

    const redirect = async (data) => {
        setTimeout(() => {
            if (data.berkeley) {
                navigate(
                    "/listings", {
                        replace: false,
                        state: data
                    }
                )
            }
        }, 2000)
    }

    return (
        <div>
                { signedIn ? 
                    user.berkeley ? (
                        <p class="auth-success">Signing in as {user.name} ({user.email})...</p>
                    ) : (
                        <p class="auth-error">You must sign in with a valid UC Berkeley email address.</p>
                    )
                : (
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                            <GoogleLogin 
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Sign in with Google"
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse)
                                    authenticate(credentialResponse)
                                }}
                                onError={() => {
                                    console.log("Login failed")
                                }}
                            />
                        </GoogleOAuthProvider>
                    )
                }
        </div>
    )
}