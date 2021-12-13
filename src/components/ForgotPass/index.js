import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

require("dotenv").config();

const ForgotPass = () => {
  //here it'll have one input for the email and it'll do the forgot backend route
  //this will find the navigate to the front page after showing an alert
  //saying that the email was sent then take you back to the frint page
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

//   const getUsers = async () => {
//     const user = await axios.get(`${BASE_URL}/users`);
//     setUsers(user.data);
//   };

//   useEffect(() => {
//     getUsers();
//     // eslint-disable-next-line
//   }, []);

  const forgotEmail = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    let res = await axios.post(`${BASE_URL}/forgotPass`, {
      email: e.target[0].value,
    });
    navigate("/");
  };

  return (
    <div>
      <div className="loginMainDiv">
        <h1 className="loginHead">Forgot password</h1>
        <div className="inputsDiv">
          <form onSubmit={forgotEmail}>
            <input
              className="loginInput"
              required
              name="userEmail"
              placeholder="Enter your email"
            />
            <input className="loginBtn" value="Send code" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
