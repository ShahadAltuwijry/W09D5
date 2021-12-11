import React from "react";
import axios from "axios";
import { login } from "../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const popupTools = require("popup-tools");

const Login = () => {
  // eslint-disable-next-line
  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logMethod, setLogMethod] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const logging = async () => {
    const res = await axios.post(`${BASE_URL}/login`, {
      logMethod: logMethod,
      password: password,
    });
    const data = {
      user: res.data.result,
      token: res.data.token,
    };
    console.log(res);
    dispatch(login(data));

    navigate("/");
  };

  const oAuth = () => {
    popupTools.popup(
      `${BASE_URL}/auth/google`,
      "Logging in with Google",
      { width: 500, height: 500 },
      (err, user) => {
        if (err) {
          console.log("caughton error:", err.message);
        } else {
          dispatch(login({ token: user.token, user: user.result }));
          navigate("/");
        }
      }
    );
  };

  return (
    <div className="loginMainDiv">
      <h1 className="loginHead">Login</h1>
      <div className="inputsDiv">
        <input
          className="loginInput"
          required
          type="text"
          placeholder="enter username or email"
          onChange={(e) => setLogMethod(e.target.value)}
        />
        <input
          className="loginInput"
          required
          type="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn" onClick={logging}>
          Login
        </button>
        <br/>
        <h4>Or login using:</h4>
        <button className="googleBtn" onClick={oAuth}>
          Google+
        </button>
      </div>
    </div>
  );
};

export default Login;
