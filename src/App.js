// import logo from './logo.svg';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Signup2 from './components/Signup2';
// import Home from './components/Home';
// import Login2 from './components/Login2';
// import Navbar from './components/Navbar';

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/login2" element={<Login2 />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/signup2" element={<Signup2 />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Signup2 from './components/Signup2';
import Home from './components/Home';
import Login2 from './components/Login2';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Navbar from './components/Navbar';
import { useState } from 'react';


import './App.css';

function App() {
    const commands = [
        {
            command: ["Go to *", "Open * "],
            callback: (redirectPage) => setRedirectUrl(redirectPage),
        },
    ];

    const {transcript} = useSpeechRecognition({ commands });
    const [redirectUrl, setRedirectUrl] = useState("");
    const pages = ['home', 'login' , 'signup'];
    const urls = {
      home: "/",
      login: "/login",
      signup: "/signup"
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null;
    }


    let redirect = "";

    if (redirectUrl) {
      if (pages.includes(redirectUrl)) {
        redirect = <Navigate to={urls[redirectUrl]} />;
      } else {
        redirect = <p>Could not find page: {redirectUrl}</p>;
      }
    }
  
  return (
    <div className="App">
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>

        {redirect}
      </BrowserRouter>
      {/* <p id="transcript"> Transcript: {transcript}</p>

      <button class="button1" onClick={SpeechRecognition.startListening}>Click me</button> */}
    </div>
  );
}



export default App; 

{/* <div id='links'>
<Link to = '/'>Home</Link>
<Link to = '/login2'></Link>
<Link to = '/signup'>Signup1</Link>

</div> */}