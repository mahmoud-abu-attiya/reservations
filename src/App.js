import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import MyTable from "./components/MyTable";
import { useState, useEffect } from "react";
import Res from "./components/Res";
import Cookies from "js-cookie";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/table" />
              ) : (
                <Login login={setLoggedIn} />
              )
            }
          />
          <Route
            path="/table"
            element={loggedIn ? <MyTable /> : <Navigate to="/" />}
          />
          <Route
            path="/reservations"
            element={<Res />}
          />
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
