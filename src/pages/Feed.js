import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import FeedFriends from "../components/FeedFriends";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import { getPosts } from "../utils/getPosts";
import { getAccounts } from "../utils/getAccounts";
import { postPost } from "../utils/postPost";

function Feed() {

  const navigate = useNavigate();
  let [posts, setPosts] = useState(null);
  let [accounts, setAccounts] = useState(null);
  let {authTokens, user, userInfo, logoutUser} = useContext(AuthContext);


  useEffect(() => {
    getPosts(authTokens, setPosts, logoutUser);
    getAccounts(authTokens, setAccounts, logoutUser);
  }, []);

  function submitPost(e) {
    postPost(e, authTokens, user, navigate);
  }


  if (userInfo && accounts && posts) {
    
    return (
      <div className="feed-container">
        <NavBar/>
        <Sidebar/>
        <FeedFriends accounts={accounts}/>
        <div className="feed-center-panel">
          <NewPost submitPost={submitPost}/>
          <Posts accounts={accounts} posts={posts} />
        </div>
      </div>
    );}
  }
  
  export default Feed;