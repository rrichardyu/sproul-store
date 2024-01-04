import { Link } from "react-router-dom"
import Authenticate from "./Authentication"

export default function NavigationBar() {
    return (
        <ul id="nav-list">
            <li class="nav-item nav-web-left"><Link className="nav-link nav-web-left" to="/">sproul.store</Link></li>
            <li class="nav-item"><Link className="nav-link" to="/">Listings</Link></li>
            <li class="nav-item"><Link className="nav-link" to="/listing/new">New Listing</Link></li>
            <li class="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li class="nav-item nav-right" id="nav-google-sign-in">
                <Authenticate></Authenticate>
            </li>
        </ul>
    )
}