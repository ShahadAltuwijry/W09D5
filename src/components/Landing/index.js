import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
require("dotenv").config();

const Landing = () => {
  const state = useSelector((state) => {
    return state;
  });

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadImg = storage.ref(`images/${image.name}`).put(image);

    uploadImg.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  // eslint-disable-next-line
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  // const [likes, setLikes] = useState(0);

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //getting all undeleted posts
  const getAllPosts = async () => {
    const res = await axios.get(`${BASE_URL}/allPosts`);

    setPosts(res.data);
  };

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, []);
  //---------------------------------

  //posting
  const addPost = async (e) => {
    e.preventDefault();
    try {
      let newPost = e.target.newPost.value;
      // let postImg = e.target.postImg.value;

      // eslint-disable-next-line
      const res = await axios.post(
        `${BASE_URL}/post/${state.signIn.user._id}`,
        {
          desc: newPost,
          img: url,
        }
      );

      getAllPosts();
      e.target.newPost.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };
  //-----------------------------------------

  //soft deleteing post
  const deletePost = async (id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/softDelPost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });
      console.log(res, "deleting");

      getAllPosts();
    } catch (error) {
      console.log(error.message);
    }
  };
  //--------------------------------------

  //like
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
      getAllPosts();
    } catch (error) {
      console.log(error.message);
    }
  };

  //---------------------------

  //to open post details
  const fullPost = (id) => {
    navigate(`/postDetails/${id}`);
  };

  //-----------------------

  //to get likes counter

  return (
    <div className="mainDivLand">
      <h1>Home Page</h1>
      {!state.signIn.token ? (
        <div className="logDiv">
          <button className="logBtn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="logBtn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      ) : (
        <div>
          <h4>welcome back!</h4>

          <div className="addingDiv">
            <form onSubmit={addPost}>
              <input
                required="you didnt write anything"
                type="text"
                name="newPost"
                className="addingInput"
                placeholder="What's happening?"
              />

              <button className="sendBtn" type="submit">
                <img
                  className="comIcon"
                  src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-send-instagram-flatart-icons-outline-flatarticons.png"
                  alt="icon"
                />
              </button>
              <div className="uploading">
                <label style={{ color: "white" }} className="uploadLabel">
                  Upload Image
                  <input
                    style={{
                      marginLeft: "10px",
                    }}
                    type="file"
                    name="postImg"
                    onChange={handleChange}
                  />
                </label>
                <button
                  style={{
                    marginRight: "10px",
                  }}
                  className="upBtn"
                  onClick={handleUpload}
                >
                  Upload
                </button>
                <progress value={progress} max="100" />
              </div>
            </form>
          </div>

          {posts &&
            posts.reverse().map((post) => {
              return (
                <div className="postsMainDiv" key={post._id + 11}>
                  <div className="postDiv" key={post._id + 10}>
                    <div className="contDiv">
                      <div className="userInfo" style={{ display: "flex" }}>
                        <img
                          style={{ width: "50px", borderRadius: "100%" }}
                          src={post.userId.avatar}
                          alt="userImg"
                        />
                        <h4 className="posterName" key={post._id + 1}>
                          @{post.userId.userName}
                        </h4>
                      </div>
                      <h2 className="postDesc" key={post._id + 2}>
                        {post.desc}
                      </h2>
                      {post.img ? (
                        <div
                          style={{
                            margin: "30px",
                            marginLeft: "80px",
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
                        style={{ color: "grey", fontSize: "15px" }}
                        key={post._id + 3}
                      >
                        {post.timeStamp}
                      </p>
                    </div>
                    <div className="btnsDiv" key={post._id + 4}>
                      <button
                        className="btn"
                        key={post._id + 5}
                        onClick={() => fullPost(post._id)}
                      >
                        <img
                          className="comIcon"
                          src="https://img.icons8.com/windows/64/000000/comment-medical.png"
                          alt="icon"
                        />
                      </button>
                      <button
                        className="btn"
                        onClick={() => likePost(post._id, state.signIn.userId)}
                        key={post._id + 6}
                      >
                        <img
                          className="comIcon"
                          src="https://img.icons8.com/windows/50/000000/like.png"
                          alt="icon"
                        />
                      </button>
                      {post.userId._id === state.signIn.user._id ||
                      state.signIn.user.role === "61a73488b03855b1f60c356f" ? (
                        <>
                          <button
                            className="btn"
                            onClick={() => deletePost(post._id)}
                            key={post._id + 8}
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
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Landing;
