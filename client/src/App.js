import { Route, Routes } from "react-router-dom"
import Listing from "./pages/Listing"
import Listings from "./pages/Listings"
import Profile from "./pages/Profile"
import NavigationBar from "./components/NavigationBar"

function App() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
