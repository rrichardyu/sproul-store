import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useAuth } from '../context/AuthContext';

export default function Listing() {
    const { id } = useParams()
    const [isBusy, setBusy] = useState(true)
    const [listing, setListing] = useState([])
    const [authState, setAuthState] = useAuth()

    const getListing = async (id) => {
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