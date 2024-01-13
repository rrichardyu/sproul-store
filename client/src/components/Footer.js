import { useAuth } from "../context/AuthContext";

export default function Footer() {
    const [authState, setAuthState] = useAuth()

    return (
        <footer>
            <p class="footer-row" onClick={() => {navigator.clipboard.writeText(authState.token)}}>(⎘ click to copy session token)</p>
            <p class="footer-row"><b>sproul.store</b> {Date().toString()}</p>
        </footer>
    )
}