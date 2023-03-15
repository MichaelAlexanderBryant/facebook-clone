import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import FeedFriends from "../components/FeedFriends";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import { getPosts } from "../utils/api/getPosts";
import { getAccounts } from "../utils/api/getAccounts";
import { postPost } from "../utils/api/postPost";
import { postComment } from "../utils/api/postComment";
import { putPostLike } from "../utils/api/putPostLike";

function Feed() {

  let [posts, setPosts] = useState(null);
  let [accounts, setAccounts] = useState(null);
  let {authTokens, user, userInfo, logoutUser} = useContext(AuthContext);


  useEffect(() => {
    getPosts(authTokens, setPosts, logoutUser);
    getAccounts(authTokens, setAccounts, logoutUser);
  }, []);

  let [reload, setReload] = useState(true);

  function submitPost(e) {
    postPost(e, authTokens, user);
    setPosts(...posts)
    e.target.reset();
    setReload(true);
  }

  useEffect(()=> {
    let fetchPosts = async () =>{
      let data = await getPosts(authTokens, logoutUser);
      setPosts(data);
    } 
    fetchPosts();
    setReload(false);
  }, [reload])

  let handlePostLike = (postId) => {

    let putLike = async () => {
      await putPostLike(authTokens, user, postId)
      setPosts([...posts])
    }
    putLike();
    setReload(true);  
  }

  if (userInfo && accounts && posts) {
    return (
      <div className="feed-container">
        <NavBar/>
        <Sidebar/>
        <FeedFriends accounts={accounts}/>
        <div className="feed-center-panel">
          <NewPost submitPost={submitPost}/>
          <Posts accounts={accounts} posts={posts} handlePostLike={handlePostLike}/>
        </div>
      </div>
    );}
  }
  
  export default Feed;