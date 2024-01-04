import { useState } from "react"

export default function NewListing() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [uid, setUID] = useState("")

    const createNewListing = async (event) => {
        event.preventDefault();

        try {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");

            const newListingResponse = await fetch(`/api/listings`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    title: title,
                    description: description,
                    uid: uid
                })
            })
            const listingJSON = await newListingResponse.json()
            console.log(listingJSON)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <h1 class="pageTitle">New Listing</h1>
            <form onSubmit={createNewListing}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input name="description" id="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="uid">User ID</label>
                    <input name="uid" id="uid" onChange={(e) => setUID(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}