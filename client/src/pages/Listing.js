import { useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom"
import { useAuth } from '../context/AuthContext';

export default function Listing() {
    const { id } = useParams()
    const [isBusy, setBusy] = useState(true)
    const [listing, setListing] = useState([])
    const [authState, setAuthState] = useAuth()

    const getListing = useCallback(async (id) => {
        try {
            let headers = new Headers()
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${authState.token}`)

            const listingResponse = await fetch(`/api/listing/${id}`, {
                headers: headers
            })
            const listingJSON = await listingResponse.json()
            console.log(listingJSON)
            setListing(listingJSON)
        } catch (err) {
            console.error(err.message)
        }
    }, [authState.token])

    useEffect(() => {
        getListing(id)
        setBusy(false)
    }, [getListing, id])

    if (!isBusy) {
        return (
            <div id="listing-card-container">
                <div class="listing-left-container">
                    <div class="listing-main-card">
                        <h2>{listing.title}</h2>
                        <h4>Posted by {listing.name} on {listing.created_at}</h4>
                        {listing.categories?.map((category) => (
                            <p class="listing-category-tag">{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</p>
                        ))}
                    </div>
                    <div class="listing-main-card">
                        <p id="listing-description">{listing.description}</p>
                    </div>
                </div>
                <div class="listing-right-container">
                    <div class="listing-side-card">
                        <h2>Contact Information</h2>
                    </div>
                </div>
            </div>
        )
    } else {
        return <p class="loading">Fetching listing...</p>
    }
}