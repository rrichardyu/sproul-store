import { Route, Routes, Outlet } from "react-router-dom"
import Listing from "./pages/Listing"
import NewListing from "./pages/NewListing"
import Listings from "./pages/Listings"
import Profile from "./pages/Profile"
import NavigationBar from "./components/NavigationBar"
import NotFound from "./pages/NotFound"
import "./App.css"
import Landing from "./pages/Landing"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={
          <>
            <NavigationBar />
            <Outlet />
          </>
          }>
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing">
            <Route path=":id" element={<Listing />} />
            <Route path="new" element={<NewListing />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
