import { useState } from "react"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

export default function Authentication() {
    const [user, setUser] = useState({})
    const [signedIn, setSignedIn] = useState(false)

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
            setSignedIn(true)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
                { signedIn ? 
                    user.berkeley ? (
                        <p>Signed in as {user.name} ({user.email})</p>
                    ) : (
                        <p>You must sign in with a valid UC Berkeley email address (@berkeley.edu).</p>
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