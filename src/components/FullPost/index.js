import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";

const FullPost = () => {
  const state = useSelector((state) => {
    return state;
  });

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  let postId = useParams().id;

  console.log(comments);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //getting the full post details
  const details = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/fullpost/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });

      setPost(res.data[0]);
      setComments(res.data[1]);
      setLikes(res.data[2]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    details();
  }, []);

  //posting a comment
  const comment = async (e) => {
    e.preventDefault();
    try {
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
            <h2 className="name">{post.desc}</h2>
            <p
              className="timeStamp"
              style={{ color: "grey", fontSize: "10px" }}
              key={post._id + 3}
            >
              {post.timeStamp}
            </p>
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
                        // marginBottom: "-10px",
                      }}
                    >
                      @{com.userId.userName}
                    </h3>
                    <h2 key={com._id + 3}>{com.desc}</h2>

                    <p
                      className="timeStamp"
                      style={{ color: "grey", fontSize: "10px" }}
                      key={com._id + 4}
                    >
                      {com.timeStamp}
                    </p>
                    <hr />
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
