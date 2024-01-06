import { useAuth } from "../context/AuthContext";

export default function Footer() {
    const [authState, setAuthState] = useAuth()

    return (
        <footer>
            <p class="footer-row"><b>UID:</b> {authState.uid}</p>
            <p class="footer-row"><b>Session Token:</b> {authState.token}</p>
            <p class="footer-row"><b>sproul.store</b> (dev) {Date().toString()}</p>
        </footer>
    )
}