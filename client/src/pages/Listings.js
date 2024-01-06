import { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { formatDate } from '../Utils';

export default function Listings() {
    const [isBusy, setBusy] = useState(true)
    const [listings, setListings] = useState([])
    const [authState] = useAuth()

    const getListings = useCallback(async (req_num_listings) => {
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
    }, [authState.token])

    useEffect(() => {
        getListings(15)
        setBusy(false)
    }, [getListings])

    if (!isBusy) {
        return (
            <>
                <h1 class="pageTitle">Listings</h1>
                <div id="listings-container">
                    {listings.map((listing) => (
                        <>
                            <Link className="listing-item" class="listing-item" to={`/listing/${listing.id}`}>
                            <div>
                                <h3 class="listing-title">{listing.title}</h3>
                                <h4 class="listing-subtitle">Posted by {listing.first_name} on {formatDate(listing.created_at)}</h4>
                                <p class="listing-description">{listing.description}</p>
                            </div>
                            </Link>
                        </>
                    ))}
                </div>
            </>
        )
    } else {
        return <p>Fetching listings...</p>
    }
}