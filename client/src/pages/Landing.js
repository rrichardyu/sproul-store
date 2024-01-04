import Authentication from "../components/Authentication";

export default function Landing() {
    return (
        <div id="landing-container">
            <div id="landing-content">
                <h1 id="landing-title">sproul.store</h1>
                <p class="landing-description">A community marketplace for students at UC Berkeley.</p>
                <p class="landing-description">Sign in with your berkeley.edu email.</p>
                <div id="landing-auth-btn">
                    <Authentication />
                </div>
            </div>
        </div>
    )
}