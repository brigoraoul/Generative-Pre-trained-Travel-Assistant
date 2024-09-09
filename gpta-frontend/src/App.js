import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <main className="App-body">
        <h1>Welcome to the Body of the App</h1>
        <p>This is the content of the body section!</p>
      </main>
    </div>
  );
}

export default App;
