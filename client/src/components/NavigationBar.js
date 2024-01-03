import { Link } from "react-router-dom"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"

export default function NavigationBar() {
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
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log("Login failed");
                    }}
                />
            </GoogleOAuthProvider>
        </ul>
    )
}