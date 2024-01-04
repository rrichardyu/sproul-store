import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function NavigationBar() {
    const navigate = useNavigate()

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
            <li class="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li class="nav-item nav-right"><button onClick={logout}>Sign out</button></li>
        </ul>
    )
}