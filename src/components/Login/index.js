import React from "react";
import axios from "axios";
import { login } from "../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "animate.css";
import Swal from "sweetalert2";
require("dotenv").config();
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
  // eslint-disable-next-line
  const [allUsers, setAllUsers] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getUsers = async () => {
    const user = await axios.get(`${BASE_URL}/users`);
    setAllUsers(user.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const logging = async (e) => {
    e.preventDefault();

    if (logMethod.length !== 0 && password.length > 5) {
      const res = await axios.post(`${BASE_URL}/login`, {
        logMethod: logMethod,
        password: password,
      });

      // console.log(res, "user res");

      if (res.data === "user not confirmed, please check your email") {
        Swal.fire({
          icon: "error",
          title: "Please confirm your account",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/confirm");
      } else if (res.data === "invalid email or password") {
        Swal.fire({
          icon: "error",
          title: "invalid password or email, please try again",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else if (res.data === "user is not registred or incorrect") {
        Swal.fire({
          icon: "error",
          title: "user is not registred or incorrect",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else {
        const data = {
          user: res.data.result,
          token: res.data.token,
        };
        // console.log(res);
        dispatch(login(data));

        navigate("/");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid information, please re-check.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
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
      <h1 className="loginHeadL">Login</h1>
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
        <button className="loginBtnL" onClick={logging}>
          Login
        </button>
        <br />
        <a className="anchr" href="/forgotpass">
          Forgot Password?<i> reset password</i>
        </a>
        <br />
        <h4>Or login using:</h4>
        <button className="googleBtnL" onClick={oAuth}>
          Google+
        </button>
      </div>
    </div>
  );
};

export default Login;
