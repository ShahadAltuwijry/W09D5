import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Confirm = () => {
  //   console.log(state, "state");

  const [code, setCode] = useState(0);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const confirm = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const conTrue = async () => {
    try {
      // eslint-disable-next-line
      if (user.key == code) {
        // eslint-disable-next-line
        const res = await axios.put(`${BASE_URL}/confirm/${user._id}`);

        localStorage.clear();
        navigate("/login");
      } else {
        Swal.fire({
          title: "Please enter a Valid Code :)",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  useEffect(() => {
    confirm();
  }, []);

  return (
    <div>
      <h1>
        Please Confirm your account by writing <br /> the security code you got
        on your Email.
      </h1>

      <input
        type="number"
        name="code"
        required
        placeholder="Enter confirmation code"
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={(e) => conTrue()}>Confirm</button>
    </div>
  );
};

export default Confirm;
