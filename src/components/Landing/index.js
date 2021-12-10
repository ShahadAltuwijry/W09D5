import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css";

const Landing = () => {
  const state = useSelector((state) => {
    return state;
  });

  // eslint-disable-next-line
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  // console.log(state);
  // console.log(posts);
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
      console.log(newPost);
      // eslint-disable-next-line
      const res = await axios.post(
        `${BASE_URL}/post/${state.signIn.user._id}`,
        {
          desc: newPost,
        }
      );

      getAllPosts();
    } catch (error) {
      console.log(error.message);
    }
  };
  //-----------------------------------------

  //soft deleteing post
  const deletePost = async (id) => {
    setLiked(!liked);
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/softDelPost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });
      console.log(res, "deleting");

      // const data = {
      //   delTask: "",
      // };
      // dispatch(delete_tasks({ data }));

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
      setLiked(!liked);
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

  return (
    <div className="mainDivLand">
      <h1>Home Page</h1>
      {!state.signIn.token ? (
        <>
          <button className="logBtn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="logBtn" onClick={() => navigate("/register")}>
            Register
          </button>
        </>
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
            </form>
          </div>

          {posts.map((post) => {
            return (
              <div className="postsMainDiv" key={post._id + 11}>
                <div className="postDiv" key={post._id + 10}>
                  <h4 className="posterName" key={post._id + 1}>
                    @{post.userId.userName}
                  </h4>
                  <h2 className="postDesc" key={post._id + 2}>
                    {post.desc}
                  </h2>
                  <p
                    className="timeStamp"
                    style={{ color: "grey", fontSize: "10px" }}
                    key={post._id + 3}
                  >
                    {post.timeStamp}
                  </p>
                  <div className="btnsDiv" key={post._id + 4}>
                    <button className="btn" key={post._id + 5}>
                      <img
                        className="comIcon"
                        src="https://img.icons8.com/windows/64/000000/comment-medical.png"
                        alt="icon"
                      />
                    </button>
                    {!liked ? (
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
                    ) : (
                      <button
                        className="btn"
                        onClick={() => likePost(post._id, state.signIn.userId)}
                        key={post._id + 7}
                      >
                        <img
                          className="comIcon"
                          src="https://img.icons8.com/windows/32/000000/dislike.png"
                          alt="icon"
                        />
                      </button>
                    )}

                    {post.userId._id === state.signIn.user._id ? (
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
