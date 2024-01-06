import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../context/AuthContext"

export default function Profile() {
    // TODO: render my info, my listings (from API), and ability to edit/delete this info

    const id = 8

    const [isBusy, setBusy] = useState(true)
    const [userData, setUserData] = useState({})
    const [authState, setAuthState] = useAuth()

    const getUserData = useCallback(async () => {
        try {
            let headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${authState.token}`)

            const userDataResponse = await fetch(`/api/user/my`, {
                headers: headers
            })
            const userDataJSON = await userDataResponse.json()
            console.log(userDataJSON)
            setUserData(userDataJSON)
        } catch (err) {
            console.error(err.message)
        }
    }, [authState.token, authState.uid])

    useEffect(() => {
        getUserData()
        setBusy(false)
    }, [getUserData])

    if (!isBusy) {
        return (
            <>
                <h1 class="pageTitle">Profile</h1>
                <div id="cards-container">
                    <div id="personal-information">
                        <h2 class="card-title">Personal Information</h2>
                        <table>
                            <tr>
                                <td class="data-name">Display Name</td>
                                <td class="data-value">{userData.first_name}</td>
                            </tr>
                            <tr>
                                <td class="data-name">Email</td>
                                <td class="data-value">{userData.email}</td>
                            </tr>
                            <tr>
                                <td class="data-name">User ID</td>
                                <td class="data-value">{userData.uid}</td>
                            </tr>
                            <tr>
                                <td class="data-name">Joined</td>
                                <td class="data-value">{userData.created_at}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="my-listings">
                        <h2 class="card-title">My Listings</h2>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <p>Fetching profile information...</p>
        )
    }
}