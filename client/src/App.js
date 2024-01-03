import { Route, Routes } from "react-router-dom"
import Listing from "./pages/Listing"
import NewListing from "./pages/NewListing"
import Listings from "./pages/Listings"
import Profile from "./pages/Profile"
import NavigationBar from "./components/NavigationBar"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/listing">
          <Route path=":id" element={<Listing />} />
          <Route path="new" element={<NewListing />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
