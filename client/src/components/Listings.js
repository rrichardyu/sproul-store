import { useEffect, useState } from 'react';

export default function Listings({ req_num_listings }) {
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
    }, [req_num_listings])

    return (
        <div>
            {listings.map((listing) => (
                <>
                    <h3>{listing.title}</h3>
                    <h4>Posted by {listing.first_name} on {listing.created_at}</h4>
                    <p>{listing.description}</p>
                    <hr />
                </>
            ))}
        </div>
    )
}