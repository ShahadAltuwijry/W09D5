import React from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
  const state = useSelector((state) => {
    return state;
  });

  return (
    <div
      style={{
        position: "fixed",
        width: "100px",
        marginLeft: "1070px",
        marginTop: "20px",
      }}
    >
      {state.signIn.user && (
        <>
          <img
            style={{ width: "70px", borderRadius: "100%" }}
            alt="userImg"
            src={state.signIn.user.avatar}
          />
          <h3>@{state.signIn.user.userName}</h3>
        </>
      )}
    </div>
  );
};

export default UserPage;
