import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import FeedFriends from "../components/FeedFriends";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";

function Feed() {

  const navigate = useNavigate();

  let [posts, setPosts] = useState(null);
  let [accounts, setAccounts] = useState(null);
  let {authTokens, user, userInfo, logoutUser} = useContext(AuthContext);

  let getPosts = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/posts/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access) 
          }
      })
      let data = await response.json()

      if (response.status === 200) {
          setPosts(data);
      } else if (response.statusText === 'Unauthorized') {
          logoutUser();
      };
  };

  let getAccounts = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/accounts/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access) 
        }
    })
    let data = await response.json()
    if (response.status === 200) {
        setAccounts(data);
    } else if (response.statusText === 'Unauthorized') {
        logoutUser();
    };
};

  let submitPost = async (e) => {

    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('body', e.target.body.value);
    if (e.target.image.files.length > 0){
    uploadData.append('image', e.target.image.files[0], e.target.image.files[0].name);
    };
    uploadData.append('author', user.user_id)
    
    let response = await fetch('http://127.0.0.1:8000/api/posts/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: uploadData
    });
    if (response.status === 201) {
        navigate("/");
    } else {
        alert("Something went wrong");
    };  
  }

  useEffect(() => {
    getPosts();
    getAccounts();
  },[])

  if (accounts && posts) {
    return (
      <div className="feed-container">
        <NavBar/>
        <Sidebar/>
        <FeedFriends accounts={accounts}/>
        <div className="feed-center-panel">
          <NewPost submitPost={submitPost}/>
          <Posts accounts={accounts} posts={posts}/>
        </div>
      </div>
    );}
  }
  
  export default Feed;