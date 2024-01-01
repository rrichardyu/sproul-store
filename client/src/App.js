const callAPIEndpoint = () => {
  fetch("/").then((data) => {
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={callAPIEndpoint}>Test</button>
      </header>
    </div>
  );
}

export default App;
