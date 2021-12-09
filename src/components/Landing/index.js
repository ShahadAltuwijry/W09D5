import React from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "./../../reducers/login";
// import { useDispatch, useSelector } from "react-redux";

const Landing = () => {
  // const state = useSelector((state) => {
  //   return state;
  // });
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div>
      <h1>Landing</h1>
      <button className="logBtn" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="logBtn" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default Landing;
