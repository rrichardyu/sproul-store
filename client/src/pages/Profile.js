import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../context/AuthContext"
import { formatDate } from "../Utils"
import { Link } from "react-router-dom"

export default function Profile() {
    // TODO: render my info, my listings (from API), and ability to edit/delete this info

    const id = 8

    const [isBusy, setBusy] = useState(true)
    const [userData, setUserData] = useState({})
    const [myListings, setMyListings] = useState([])
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
    }, [authState.token])

    const getMyListings = useCallback(async () => {
        try {
            let headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${authState.token}`)

            const myListingsResponse = await fetch(`/api/listings/my`, {
                headers: headers
            })

            const myListingsJSON = await myListingsResponse.json()
            console.log(myListingsJSON)
            setMyListings(myListingsJSON)
        } catch (err) {
            console.error(err.message)
        }
    }, [authState.token])

    useEffect(() => {
        getUserData()
        getMyListings()
        setBusy(false)
    }, [getMyListings, getUserData])

    if (!isBusy) {
        return (
            <>
                <h1 class="pageTitle">Profile</h1>
                <div id="cards-container">
                    <div id="cards-container-left">
                        <div class="card-left">
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
                            <p class="card-text">Your personal information is associated with your UC Berkeley Google account.</p>
                        </div>
                        <div class="card-left">
                            <h2 class="card-title">Contact Information</h2>
                        </div>
                    </div>
                    <div id="cards-container-right">
                        <div class="card-right">
                            <h2 class="card-title">My Listings</h2>
                            <table id="my-listings-table">
                                    <tr>
                                        <th class="my-listings-header">Title</th>
                                        <th class="my-listings-header">Created</th>
                                        <th class="my-listings-header">Actions</th>
                                    </tr>
                                {myListings.map((listing) => (
                                    <tr>
                                        <td class="my-listing-data"><Link class="profile-listing-title" to={`/listing/${listing.id}`}>{listing.title}</Link></td>
                                        <td class="my-listing-data">
                                            {
                                                formatDate(listing.created_at)
                                            }
                                        </td>
                                        <td class="my-listing-data">*</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
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