import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function NavigationBar() {
    const navigate = useNavigate()
    const [authState, setAuthState] = useAuth()

    const logout = () => {
        redirect()
        console.log("Logged out of Google")
    }

    const redirect = async () => {
        navigate(
            "/", {
                replace: false,
            }
        )
    }

    return (
        <ul id="nav-list">
            <li class="nav-item nav-web-left"><Link className="nav-link nav-web-left">sproul.store</Link></li>
            <li class="nav-item"><Link className="nav-link" to="/listings">Listings</Link></li>
            <li class="nav-item"><Link className="nav-link" to="/listing/new">New Listing</Link></li>
            <li class="nav-item nav-right" id="sign-out-container">
                <button id="sign-out-btn" onClick={logout}>Log out</button>
            </li>
            <li class="nav-item nav-right"><Link className="nav-link" to="/profile">Profile</Link></li>
        </ul>
    )
}