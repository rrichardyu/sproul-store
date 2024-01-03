import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

export default function Listings({ req_num_listings }) {
    const [isBusy, setBusy] = useState(true)
    const [listings, setListings] = useState([])

    const getListings = async (req_num_listings) => {
        try {
            const listingsResponse = await fetch("/api/listings?" + new URLSearchParams({
                limit: req_num_listings
            }))
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
            <div>
                {listings.map((listing) => (
                    <>
                        <h3>{listing.title}</h3>
                        <h4>Posted by {listing.first_name} on {listing.created_at}</h4>
                        <p>{listing.description}</p>
                        <Link to={`/listing/${listing.id}`}>Details</Link>
                        <hr />
                    </>
                ))}
            </div>
        )
    } else {
        return <p>Fetching listings...</p>
    }
}