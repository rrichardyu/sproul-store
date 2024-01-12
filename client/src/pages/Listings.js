import { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { formatDate } from '../Utils';

export default function Listings() {
    const [isBusy, setBusy] = useState(true)
    const [listings, setListings] = useState([])
    const [categories, setCategories] = useState([])
    const [categoriesMapping, setCategoriesMapping] = useState([])
    const [activeCategory, setActiveCategory] = useState(0)
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

    const getCategoriesMapping = useCallback(async () => {
        try {
            const categoriesMappingResponse = await fetch("/api/categories_mapping", 
                {
                    headers: {
                        "Authorization": "Bearer " + authState.token
                    }
                }
            )
            const categoriesMappingJSON = await categoriesMappingResponse.json()
            console.log(categoriesMappingJSON)
            setCategoriesMapping(categoriesMappingJSON)
        } catch (err) {
            console.error(err.message)
        }
    }, [authState.token])

    useEffect(() => {
        getListings(15)
        getCategories()
        getCategoriesMapping()
        setBusy(false)
    }, [getCategories, getCategoriesMapping, getListings])

    if (!isBusy) {
        return (
            <>
                <h1 class="pageTitle">Listings</h1>
                <div id="listings-categories">
                    {activeCategory === 0
                        ?   <button class="listings-category-button-active" onClick={() => setActiveCategory(0)}>All</button>
                        :   <button class="listings-category-button" onClick={() => setActiveCategory(0)}>All</button>
                    }
                    {categories.map((category) => (
                        <>
                            {category.id === activeCategory 
                                ?   <button class="listings-category-button-active" onClick={() => setActiveCategory(category.id)}>
                                        {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                                    </button>
                                :   <button class="listings-category-button" onClick={() => setActiveCategory(category.id)}>
                                        {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                                    </button>
                            }
                        </>
                    ))}
                </div>
                <div id="listings-container">
                    {listings.map((listing) => (
                        <>
                            {categoriesMapping.map((categoryMapping) => (
                                activeCategory === 0 || activeCategory === categoryMapping.categories_id && listing.id === categoryMapping.listings_id
                                ?   <Link className="listing-item" class="listing-item" to={`/listing/${listing.id}`}>
                                        <div>
                                            <h3 class="listing-title">{listing.title}</h3>
                                            <h4 class="listing-subtitle">Posted by {listing.name} on {formatDate(listing.created_at)}</h4>
                                            <p class="listing-description">{listing.description}</p>
                                        </div>
                                    </Link>
                                : <></>
                            ))}
                        </>
                    ))}
                </div>
            </>
        )
    } else {
        return <p>Fetching listings...</p>
    }
}