import React from "react";
import axios from "axios";
import { login } from "../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

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

  return (
    <div className="loginMainDiv">
      <h1 className="loginHead">Login</h1>
      <div className="inputsDiv"></div>
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
      <button className="loginBtn" onClick={logging}>Login</button>
    </div>
  );
};

export default Login;
