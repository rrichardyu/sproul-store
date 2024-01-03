import { Route, Routes } from "react-router-dom"
import Listings from "./pages/Listings"
import Profile from "./pages/Profile"
import NavigationBar from "./components/NavigationBar"

const callUsersEndpoint = () => {
  fetch("/api/users").then((data) => {
    console.log(data)
  })
}

const callListingsEndpoint = () => {
    fetch("/api/listings").then((data) => {
      console.log(data)
    })
  }

function App() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
