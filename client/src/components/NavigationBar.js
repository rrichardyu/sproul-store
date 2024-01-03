import { Link } from "react-router-dom"

export default function NavigationBar() {
    return (
        <ul>
            <li><Link to="/">Listings</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        </ul>
    )
}