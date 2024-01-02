import { useEffect, useState } from 'react';

export default function Listing({ id }) {
    const [isBusy, setBusy] = useState(true)
    const [listing, setListing] = useState([])

    const getListing = async (id) => {
        try {
            const listingResponse = await fetch(`/api/listing/${id}`)
            const listingJSON = await listingResponse.json()
            console.log(listingJSON)
            setListing(listingJSON)
        } catch (err) {
            console.err(err.message)
        }
    }

    useEffect(() => {
        getListing(id)
        setBusy(false)
    }, [id])

    if (!isBusy) {
        return (
            <div>
                <h3>{listing.title}</h3>
                <h4>Posted by {listing.first_name} on {listing.created_at}</h4>
                <p>{listing.description}</p>
            </div>
        )
    } else {
        return <p>Fetching listing...</p>
    }
}