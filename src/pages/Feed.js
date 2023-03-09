import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";

function Feed() {

  const navigate = useNavigate();

  let [posts, setPosts] = useState([]);
  let {authTokens, user, logoutUser} = useContext(AuthContext);

  useEffect(() => {
      getPosts()
  },[])

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
  }

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
    let data = await response.json();
    if (response.status === 201) {
        navigate("/");
    } else {
        alert("Something went wrong");
    };  
  }


    return (
      <div className="feed-container">
        <NavBar/>
        <div className="feed-center-panel">
          <div className="make-a-post-container">
            <form onSubmit={submitPost}>
              <input type="text" name="body" placeholder="What's on your mind?"/>
              <input type="file" accept="image/png, image/jpeg" name="image"/>
              <button type="submit">Post</button>  
            </form>
          </div>
          <div className="feed-posts">
            {posts.slice(0).reverse().map((post, index) => {
                      return (
                        <div className="post" key={index}>
                          <p>{post.author}: {post.body}</p>
                          <img className="post-image" src={post.image} alt=""/>
                        </div>
                      )})}
          </div>
        </div>
      </div>
    );
  }
  
  export default Feed;