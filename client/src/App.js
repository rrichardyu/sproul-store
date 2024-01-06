import { Route, Routes, Outlet } from "react-router-dom"
import Listing from "./pages/Listing"
import NewListing from "./pages/NewListing"
import Listings from "./pages/Listings"
import Profile from "./pages/Profile"
import NavigationBar from "./components/NavigationBar"
import NotFound from "./pages/NotFound"
import "./App.css"
import Landing from "./pages/Landing"
import { AuthProvider } from "./context/AuthContext"
import AuthWrapper from "./components/AuthWrapper"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
          <Route element={
            <>
              <NavigationBar />
              <Outlet />
              <Footer />
            </>
            }>
              <Route element={<AuthWrapper />}>
                <Route path="/listings" element={<Listings />} />
                <Route path="/listing">
                  <Route path=":id" element={<Listing />} />
                  <Route path="new" element={<NewListing />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
              </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
