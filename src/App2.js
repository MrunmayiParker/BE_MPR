import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Signup2 from './components/Signup2';
import Home from './components/Home';
import Login2 from './components/Login2';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Navbar from './components/Navbar';
import { useState } from React;

import './App.css';

function App2() {
    const commands = [
        {
            command: ["Go to *", "Open * "],
            callback: (redirectPage) => setRedirectUrl(redirectPage),
        },
    ];

    const {transcripts} = useSpeechRecognition({commands});
    const [redirectUrl, setRedirectUrl] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
      <div id='links'>
        <Link to = '/'>Home</Link>
        <Link to = '/login2'>Login1</Link>
        <Link to = '/signup'>Signup1</Link>
        {/* <Link to = '/'></Link> */}
      </div>
        <Routes>
          <Route path="/" components={<Home />} />
          <Route path="/login" components={<Login />} />
          <Route path="/login2" components={<Login2 />} />
          <Route path="/signup" components={<Signup />} />
          <Route path="/signup2" components={<Signup2 />} />
        </Routes>
      </BrowserRouter>
      <p id="transcript">{transcripts}</p>

      <button onClick={SpeechRecognition.startListening}></button>
    </div>
  );
}

export default App2;
