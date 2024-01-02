import Listings from "./components/Listings"

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
    <div className="App">
      <header className="App-header">
        <button onClick={callUsersEndpoint}>Test users</button>
        <button onClick={callListingsEndpoint}>Test listings</button>
        <Listings req_num_listings={15}></Listings>
      </header>
    </div>
  );
}

export default App;
