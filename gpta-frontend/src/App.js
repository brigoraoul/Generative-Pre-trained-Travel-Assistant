import logo from './logo.svg';
import './App.css';
import ChatWindow from './ChatWindow';
import TextEditor from './TextEditor';

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
        <h1>Start chatting with your travel assistent!</h1>

        <div className="chat-windows-container">
          <ChatWindow />
          <TextEditor />
        </div>
        
      </main>
    </div>
  );
}

export default App;
