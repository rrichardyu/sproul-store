import ListingsFrame from "../components/ListingsFrame"

export default function Listings() {
    return (
        <>
            <h1 class="pageTitle">Listings</h1>
            <ListingsFrame req_num_listings={15}></ListingsFrame>
        </>
    )
}