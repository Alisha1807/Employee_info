//REACT ROUTER DOM
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./Login/SignUp";
import Welcome from "./Welcome";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="admin" element={<Welcome />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
