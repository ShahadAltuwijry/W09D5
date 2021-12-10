import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
        .then((res) => console.log(res));

      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        required
        type="text"
        name="userName"
        placeholder="enter a username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="enter an email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="password"
        name="password"
        placeholder="enter a password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Register</button>
    </div>
  );
};

export default Register;
