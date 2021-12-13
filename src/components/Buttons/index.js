import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../reducers/login";

const Buttons = () => {
  // eslint-disable-next-line
  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout({ token: "" }));
    navigate("/");
  };

  const back = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="logoutDiv" style={{ marginTop: "60px" }}>
        <button className="btn" onClick={back}>
          <img
            className="comIcon"
            alt="icon"
            src="https://img.icons8.com/material-outlined/50/000000/circled-left--v1.png"
          />
        </button>
      </div>
      <div className="logoutDiv">
        <button className="btn" onClick={logOut}>
          <img
            className="comIcon"
            src="https://img.icons8.com/fluency-systems-regular/48/000000/exit.png"
            alt="icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
