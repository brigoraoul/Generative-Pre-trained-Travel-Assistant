import logo from './logo.svg';
import './App.css';
import ChatWindow from './ChatWindow';

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
          Generative Pre-trained Travel Assistant
        </a>
      </header>

      <main className="App-body">
        <h1>Welcome to the Body of the App</h1>
        <ChatWindow />
      </main>
    </div>
  );
}

export default App;
