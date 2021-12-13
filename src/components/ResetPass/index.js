import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
require("dotenv").config();

const ResetPAss = () => {
  const id = useParams().id;

  const [code, setCode] = useState(0); //code from message
  const [writtenCode, setWrittenCode] = useState(0); //code from user
  const [newPass, setNewPass] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  //getting the security code
  const getUser = async () => {
    const res = await axios.get(`${BASE_URL}/oneUser/${id}`);
    setCode(res.data.resetCode);
  };

  useEffect(() => {
    getUser();
  }, []);

  //confirming the code and setting the new password
  const passReset = async (e) => {
    e.preventDefault();

    if (e.target[0].value == code) {
      //   console.log("code here");
      if (e.target[1].value === e.target[2].value) {
        // console.log("second if");
        let pass = e.target[1].value;
        const res = await axios.post(`${BASE_URL}/resetPass/${id}`, {
          newPass: pass,
        });
      }
    }
    navigate("/login");
  };

  return (
    <div>
      <div className="loginMainDiv">
        <h1 className="loginHead">Set your new password</h1>
        <div className="inputsDiv">
          <form onSubmit={passReset}>
            <input
              className="loginInput"
              required
              name="codeInput"
              placeholder="Enter the security code"
              onChange={(e) => setWrittenCode(e.target.value)}
            />
            <input
              className="loginInput"
              required
              name="password"
              type="password"
              placeholder="Enter your new password"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <input
              className="loginInput"
              required
              name="password"
              type="password"
              placeholder="Confirm your password"
            />
            <input className="loginBtn" value="Send code" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPAss;
