import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import "./style.css";
require("dotenv").config();

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [req, setReq] = useState("");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("this is a strong password");
      setReq("");
    } else {
      setErrorMessage("this isn't a strong password");
      setReq(
        "you'll need it to be 6+ long & has at least: 1 uppercase letter, 1 lowercase letter, 1 number & 1 symbol "
      );
    }
  };

  const getUsers = async () => {
    const user = await axios.get(`${BASE_URL}/users`);
    setAllUsers(user.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    let exist = false;

    // eslint-disable-next-line
    allUsers.filter((user) => {
      if (user.email === email || user.userName === userName) {
        exist = true;
      }
    });

    if (exist) {
      Swal.fire({
        icon: "error",
        title: "Email already registred, use another email or Log in please.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }

    if (!exist) {
      const regData = {
        email: email,
        userName: userName,
        password: password,
      };

      // eslint-disable-next-line
      const res = await axios
        .post(`${BASE_URL}/regster`, regData)
        .then((res) => {
          if (
            res.data ===
            "User validation failed: email: Please fill a valid email address"
          ) {
            Swal.fire({
              title: "Please enter a Valid email :)",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          } else {
            localStorage.setItem("user", JSON.stringify(res.data));
            // console.log(res.data);
            navigate("/confirm");
          }
        });
    }
  };

  const invalPass = () => {
    Swal.fire({
      title: "Please enter a Valid password :)",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  return (
    <div className="loginMainDiv">
      <h1 className="loginHead">Register</h1>
      <div className="inputsDiv">
        <input
          className="loginInput"
          required
          type="text"
          name="userName"
          placeholder="enter a username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="loginInput"
          required
          type="email"
          name="email"
          placeholder="enter an email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="loginInput"
          required
          minLength={6}
          type="password"
          name="password"
          placeholder="enter a password"
          onChange={(e) => {
            setPassword(e.target.value);
            validate(e.target.value);
          }}
        />
        <span
          className="passSpan"
          style={{ fontWeight: "bold", color: "maroon", marginTop: "10px" }}
        >
          {errorMessage}
          <br />
          {req}
        </span>
        <button
          className="loginBtn"
          onClick={password.length >= 6 ? signUp : invalPass}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
