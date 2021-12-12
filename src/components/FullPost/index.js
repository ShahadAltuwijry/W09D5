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
  const [id, setId] = useState(0);

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

      // console.log(res.data[0].userId._id);

      setPost(res.data[0]);
      setComments(res.data[1]);
      setLikes(res.data[2]);
      setCounter(counter.length);
      setId(res.data[0].userId._id);
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

  //deleteing post
  const deletePost = async (id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/softDelPost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });
      console.log(res, "deleting");

      details();
    } catch (error) {
      console.log(error.message);
    }
  };

  //liking the post
  const likePost = async (id) => {
    //params are post & user Id

    try {
      // eslint-disable-next-line
      let res = await axios.post(
        `${BASE_URL}/like/${id}/${state.signIn.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.signIn.token}`,
          },
        }
      );

      // console.log("like");
      details();
    } catch (error) {
      console.log(error.message);
    }
  };

  //deleting comment
  const deleteCom = async (id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.put(`${BASE_URL}/delComment/${id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });
      console.log(res, "deleting");

      details();
    } catch (error) {
      console.log(error.message);
    }
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
            {post.img ? (
              <div
                style={{
                  margin: "30px",
                  marginLeft: "10px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "600px",
                    maxWidth: "650px",
                    borderRadius: "10px",
                  }}
                  alt="post"
                  src={post.img}
                />
              </div>
            ) : (
              ""
            )}
            <p
              className="timeStamp"
              style={{ color: "grey", fontSize: "10px" }}
              key={postId + 3}
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

            <div className="btnsDivFull">
              <button
                className="btn"
                onClick={() => likePost(postId, state.signIn.user)}
                key={postId + 6}
              >
                <img
                  className="comIcon"
                  src="https://img.icons8.com/windows/50/000000/like.png"
                  alt="icon"
                />
              </button>
              {id === state.signIn.user._id ||
              state.signIn.user.role === "61a73488b03855b1f60c356f" ? (
                <>
                  <button
                    className="btn"
                    onClick={() => deletePost(postId)}
                    key={postId + 8}
                  >
                    <img
                      className="comIcon"
                      src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png"
                      alt="icon"
                    />
                  </button>
                </>
              ) : (
                ""
              )}
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
                    <div className="btnsDiv">
                      {com.userId._id === state.signIn.user._id ||
                      state.signIn.user.role === "61a73488b03855b1f60c356f" ? (
                        <>
                          <button
                            className="btn"
                            onClick={() => deleteCom(com._id)}
                            key={com._id + 8}
                          >
                            <img
                              className="comIcon"
                              src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png"
                              alt="icon"
                            />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
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
