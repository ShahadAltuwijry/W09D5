import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
require("dotenv").config();

const FullPost = () => {
  const state = useSelector((state) => {
    return state;
  });

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [counter, setCounter] = useState(0);

  let postId = useParams().id;

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //getting the full post details
  const details = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/fullpost/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });

      let counter = res.data[2];

      setPost(res.data[0]);
      setComments(res.data[1]);
      setLikes(res.data[2]);
      setCounter(counter.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    details();
    // eslint-disable-next-line
  }, []);

  //posting a comment
  const comment = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line
      let res = await axios.post(
        `${BASE_URL}/comment/${postId}/${state.signIn.user._id}`,
        {
          desc: e.target.comment.value,
        }
      );
      details();
    } catch (error) {}
  };

  return (
    <div className="detailsDiv">
      {post && (
        <>
          <div className="postDetailDiv">
            {/* <div className="userInfo" style={{ display: "flex" }}>
              <img
                style={{ width: "80px", borderRadius: "100%" }}
                src={post.userId.avatar}
                alt="userImg"
              />
              <h4 className="posterName" key={post._id + 1}>
                @{post.userId.userName}
              </h4>
            </div> */}
            <h2
              className="name"
              style={{ marginTop: "10px", fontSize: "35px" }}
            >
              {post.desc}
            </h2>
            <p
              className="timeStamp"
              style={{ color: "grey", fontSize: "10px" }}
              key={post._id + 3}
            >
              {post.timeStamp}
            </p>
            <br />
            <p style={{ fontSize: "20px" }}>
              {counter}
              <img
                // className="comIcon"
                style={{ width: "16px" }}
                src="https://img.icons8.com/windows/50/ffffff/like.png"
                alt="icon"
              />
              <br />
            </p>
            <p style={{ color: "gray" }}>liked by: </p>
            <div style={{ display: "flex" }}>
              {likes.map((like) => {
                return (
                  <p
                    key={like._id}
                    style={{ color: "gray", marginLeft: "5px" }}
                  >
                    @{like.userId.userName},
                  </p>
                );
              })}
            </div>
          </div>
          {comments && (
            <>
              {/* <div className="comDiv"> */}
              {comments.map((com) => {
                return (
                  <div className="comMainDiv" key={com._id + 1}>
                    <h3
                      key={com._id + 2}
                      style={{
                        color: "grey",
                        fontSize: "15px",
                        marginTop: "10px",
                      }}
                    >
                      @{com.userId.userName}
                    </h3>
                    <h2 key={com._id + 3} style={{ marginTop: "20px" }}>
                      {com.desc}
                    </h2>

                    <p
                      className="timeStamp"
                      style={{ color: "grey", fontSize: "10px" }}
                      key={com._id + 4}
                    >
                      {com.timeStamp}
                    </p>
                  </div>
                );
              })}
              {/* </div> */}
            </>
          )}
        </>
      )}
      <div className="addComDiv">
        <form onSubmit={comment}>
          <input
            required
            type="text"
            name="comment"
            className="comInput"
            placeholder="Write your comment"
          />
          <button className="sendComBtn" type="submit">
            <img
              className="comIcon"
              src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-send-instagram-flatart-icons-outline-flatarticons.png"
              alt="icon"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FullPost;
