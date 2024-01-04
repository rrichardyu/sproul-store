import { Link } from "react-router-dom"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

export default function NavigationBar() {
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
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <ul>
            <li><Link to="/">Listings</Link></li>
            <li><Link to="/listing/new">New Listing</Link></li>
            <li><Link to="/profile">Profile</Link></li>

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
        </ul>
    )
}