import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import MyTable from "./components/MyTable";
import {useState, useEffect} from "react"
import Res from "./components/Res"
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
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("I'm rnning");
  
  const [token, setToken] = useState(getCookie("token"));
  useEffect(() => {
    console.log("i'm effect");
    if(getCookie("token") !== ""){
      setLoggedIn(true)
      setToken(getCookie('token'))
    }

  }, [token]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/"  element={ loggedIn ?  <Navigate to="/table"/>  :  <Login login={setLoggedIn} setToken={setToken}/>  }/>
          <Route path="/table" element={ loggedIn ? <MyTable token={token} /> :<Navigate to="/"/> }/>
          <Route path="/reservations" element={ <Res token={token} /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
export {getCookie}

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
