import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./reducers/login";
import FullPost from "./components/FullPost";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Confirm from "./components/Confirm";
import UserPage from "./components/UserPage";

function App() {
  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout({ token: "" }));
    navigate("/");
  };

  return (
    <div className="App">
      {state.signIn.token ? (
        <div className="logoutDiv">
          <button className="btn" onClick={logOut}>
            <img
              className="comIcon"
              src="https://img.icons8.com/fluency-systems-regular/48/000000/exit.png"
              alt="icon"
            />
          </button>
        </div>
      ) : (
        ""
      )}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/postDetails/:id" element={<FullPost />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Confirm" element={<Confirm />} />
        <Route exact path="/userPage" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
