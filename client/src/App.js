import Listing from "./components/Listing"

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
        <Listing id={5}></Listing>
      </header>
    </div>
  );
}

export default App;
