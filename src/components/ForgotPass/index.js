import React from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";

require("dotenv").config();

const ForgotPass = () => {
  //here it'll have one input for the email and it'll do the forgot backend route
  //this will find the navigate to the front page after showing an alert
  //saying that the email was sent then take you back to the frint page
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const forgotEmail = async (e) => {
    e.preventDefault();

    // setEmail(e.target[0].value);

    let res = await axios.post(`${BASE_URL}/forgotPass`, {
      email: e.target[0].value,
    });
    if (res.data === "Cannot read property 'email' of null") {
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
      console.log(res, "forgot res");
      navigate("/");
    }
  };

  return (
    <div>
      <div className="loginMainDiv">
        <h1 className="loginHead">Forgot password</h1>
        <div className="inputsDivF">
          <h3>
            enter your email and we will send you a link <br /> to reset your
            password:
          </h3>
          <br />
          <form className="forgotForm" onSubmit={forgotEmail}>
            <input
              className="loginInputF"
              required
              type="email"
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
