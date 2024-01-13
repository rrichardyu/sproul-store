import { useState, useCallback, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function NewListing() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [authState, setAuthState] = useAuth()

    const checkboxHandler = (event) => {
        const value = parseInt(event.target.value)

        if (event.target.checked) {
            setSelectedCategories([...selectedCategories, value])
        } else {
            setSelectedCategories((prevData) => {
                return prevData.filter((id) => {
                    return id !== value
                })
            })
        }
    }

    const createNewListing = async (event) => {
        event.preventDefault();

        try {
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${authState.token}`)

            const newListingResponse = await fetch(`/api/listings/my`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    title: title,
                    description: description,
                    categories: selectedCategories
                })
            })
            const listingJSON = await newListingResponse.json()
            console.log(listingJSON)
        } catch (err) {
            console.error(err.message)
        }
    }

    const getCategories = useCallback(async () => {
        try {
            const categoriesResponse = await fetch("/api/categories", 
                {
                    headers: {
                        "Authorization": "Bearer " + authState.token
                    }
                }
            )
            const categoriesJSON = await categoriesResponse.json()
            console.log(categoriesJSON)
            setCategories(categoriesJSON)
        } catch (err) {
            console.error(err.message)
        }
    }, [authState.token])

    useEffect(() => {
        getCategories()
    }, [getCategories])

    return (
        <>
            <h1 class="pageTitle">New Listing</h1>
            <form class="new-listing-form-container" onSubmit={createNewListing}>
                <div class="input-container">
                    <label class="input-label" htmlFor="title">Title</label>
                    <br />
                    <input name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div class="input-container">
                    <label class="input-label" htmlFor="description">Description</label>
                    <br />
                    <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div class="input-container">
                    <label class="input-label" htmlFor="category">Category</label>
                    <br />
                    {categories.map((category) => (
                        <>
                            <input type="checkbox" checked={selectedCategories.includes(category.id)} value={category.id} onChange={checkboxHandler} />
                            <label>{category.category}</label>
                            <br />
                        </>
                    ))}
                </div>
                <button id="new-listing-submit-btn" type="submit">Submit</button>
            </form>
        </>
    )
}