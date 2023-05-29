import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import manAndCat from "./assets/manAndCat.png";
import womanAndCat from "./assets/womanAndCat.png";
import cookGif from "./assets/cooking.gif";
import origamiGif from "./assets/cat.gif";
import musicGif from "./assets/music.gif";
import readingGif from "./assets/reading.gif";
function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [post, setPost] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const url = "http://localhost:3001/";
  const postsUrl = "http://localhost:3001/posts";

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(url);
      // console.log(res);

      const userslist = res.data.map((val) => {
        return {
          Username: val.Username,
          Email: val.Email,
        };
      });
      // console.log(userslist);
      setUsers(userslist);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(postsUrl);
      // console.log(res);

      const postslist = res.data.map((val) => {
        return {
          Post: val.Post,
        };
      });
      // console.log(postslist);
      setAllPosts(postslist);
    };

    getPosts();
  }, []);

  const AddUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(url, {
        Username: userName,
        Email: email,
      });

      setUsers([
        ...users,
        {
          Username: userName,
          Email: email,
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    setUserName("");
    setEmail("");
  };

  const AddPosts = async (e) => {
    e.preventDefault();

    try {
      await axios.post(postsUrl, {
        Post: post,
      });

      setAllPosts([
        ...allPosts,
        {
          Post: post,
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    setPost("");
  };

  return (
    <>
      <div className="parent0 ">
        <h1>Meet Millie!</h1>
        <h5>The catto who's gonna make your day a lot more special!</h5>
        <h5>What do you wanna do today?</h5>
        <div className="activityGrid">
          <img src={cookGif} />
          <img src={origamiGif} />
          <img src={musicGif} />
          <img src={readingGif} />
        </div>
      </div>
      <div className="parent1 parent">
        <div className="leftCont">
          <div className="headings">
            <h1>Sign up!</h1>
            <div>
              Sign up for daily self care reminders from Millie the catto!
            </div>
          </div>

          <div className="inputCont">
            <div>
              <form onSubmit={AddUser} className="formCont">
                <input
                  className="input"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter username!"
                  required
                />
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email!"
                  required
                />

                <button type="submit" className="addButton">
                  I'm ready!
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="rightCont">
          <img src={manAndCat} />
        </div>
      </div>
      <div className="parent parent2">
        <div className="headings anonFlex">
          <img src={womanAndCat} height="50px" />
          <div>
            <h1>Add anon posts!</h1>
            <div>
              Let Millie and others know your thoughts! Spill the beans!
            </div>
          </div>
        </div>
        <div className="postsCont">
          <div>
            <form onSubmit={AddPosts}>
              <input
                className="input"
                type="text"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder="Type something!"
                required
              />

              <button type="submit" className="addButton">
                +
              </button>
            </form>
          </div>
          <div className="postsDiv">
            {allPosts.map((item, index) => (
              <div key={index} className="post">
                <div> {item.Post}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
