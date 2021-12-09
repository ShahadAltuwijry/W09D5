import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import FullPost from "./components/FullPost";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import UserPage from "./components/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/postDetails" element={<FullPost />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/userPage" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
