import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import MyTable from "./components/MyTable";
import {useState, useEffect} from "react"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  useEffect(() => {
    if(getCookie("token") !== ""){
      setLoggedIn(true)
    }

  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/"  element={ loggedIn ? ( <Navigate to="/table"/> ) : ( <Login login={setLoggedIn}/> ) }/>
          <Route path="/table" element={ loggedIn ? ( <MyTable /> ) : (<Navigate to="/"/> ) }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import React, { Suspense, lazy } from 'react';

// const Home = lazy(() => import('./routes/Home'));
// const About = lazy(() => import('./routes/About'));

// const App = () => (
//   <Router>
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Suspense>
//   </Router>
// );
