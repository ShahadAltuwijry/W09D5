import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import FullPost from "./components/FullPost";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Confirm from "./components/Confirm";
import UserPage from "./components/User";
import Buttons from "./components/Buttons";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";

require("dotenv").config();

function App() {
  const state = useSelector((state) => {
    return state;
  });

  // const navigate = useNavigate();

  // const home = () => {
  //   navigate("/");
  // }; --> strangly this one ruins the array reverse
  //on the landing page and it shows the posts
  //oldest first so i'll comment

  return (
    <div className="App">
      <img
        // onClick={() => home()}
        alt="logo"
        src="./Free Vector Graphics and Vector Art for download.png"
        style={{
          width: "10%",
          marginTop: "1%",
          marginBottom: "-3%",
          // cursor: "pointer",
        }}
      />
      {state.signIn.token ? <Buttons /> : ""}
      <UserPage />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/postDetails/:id" element={<FullPost />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Confirm" element={<Confirm />} />
        <Route exact path="/forgotPass" element={<ForgotPass />} />
        <Route exact path="/resetPass/:id" element={<ResetPass />} />
        {/* <Route exact path="/userPage" element={<UserPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
