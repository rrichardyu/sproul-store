import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Listings({ req_num_listings }) {
    const [isBusy, setBusy] = useState(true)
    const [listings, setListings] = useState([])
    const [authState, setAuthState] = useAuth()

    const getListings = async (req_num_listings) => {
        try {
            const listingsResponse = await fetch("/api/listings?" + new URLSearchParams({
                limit: req_num_listings
            }), 
                {
                    headers: {
                        "Authorization": "Bearer " + authState.token
                    }
                }
            )
            const listingsJSON = await listingsResponse.json()
            console.log(listingsJSON)
            setListings(listingsJSON)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getListings(req_num_listings)
        setBusy(false)
    }, [req_num_listings])

    if (!isBusy) {
        return (
            <div id="listings-container">
                {listings.map((listing) => (
                    <>
                        <div class="listing-item">
                            <h3 class="listing-title">{listing.title}</h3>
                            <h4 class="listing-subtitle">Posted by {listing.first_name} on {listing.created_at}</h4>
                            <p class="listing-description">{listing.description}</p>
                            <Link className="listing-details-link" to={`/listing/${listing.id}`}><button class="listing-details-button">Details</button></Link>
                        </div>
                    </>
                ))}
            </div>
        )
    } else {
        return <p>Fetching listings...</p>
    }
}