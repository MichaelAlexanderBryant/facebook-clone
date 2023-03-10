import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function Feed() {

  const navigate = useNavigate();

  let [posts, setPosts] = useState([]);
  let [accounts, setAccounts] = useState([]);
  let {authTokens, user, userInfo, logoutUser} = useContext(AuthContext);

  useEffect(() => {
      getPosts();
      getAccounts();
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
        <div className="menu-container">
          <ul className="top-menu-list">
            <li className="menu-item">Home</li>
            <li className="menu-item">My Profile</li>
          </ul>
          <ul className="bottom-menu-list">
            <li className="menu-item">Friends</li>
            <li className="menu-item">All Users</li>
            <li className="menu-item">Groups</li>
          </ul>
        </div>
        <div className="user-list-container">
          <h1 className="contacts-header">Contacts</h1>
          {userInfo.friends && userInfo.friends.length > 0 ?
          <ul className="user-list">
            {accounts.map((person, index) => {
              if ((person.id !== user.user_id) && (userInfo.friends.includes(person.id))) {
                return (
                <li className="user-list-item" key={"contact " + index}>
                  {person.profile_picture ? 
                    <img className="post-author-image" src={person.profile_picture} alt=""/>
                    : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
                  <span>{person.first_name + " " + person.last_name}</span>
                </li>)
              } else { return null }
            })}
          </ul>
          : <p className="no-contacts">No contacts to display</p>}
        </div>
        <div className="feed-center-panel">
          <div className="make-a-post-container">
            <form onSubmit={submitPost}>
              <div className="user-text-post">
              {userInfo.profile_picture ? 
                              <img className="post-author-image" src={userInfo.profile_picture} alt=""/>
                              : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
              <input className="user-text-input" type="text" name="body" placeholder={"What's on your mind, " + userInfo.first_name + "?"}/>
              </div>
              <input className="image-input" type="file" accept="image/png, image/jpeg" name="image"/>
              <button className="post-button" type="submit">Post</button>  
            </form>
          </div>
          <div className="feed-posts">
            {accounts.length > 0 && posts.length > 0 ? posts.slice(0).reverse().map((post, index) => {
                if ((userInfo.friends.includes(post.author)) || (post.author === user.user_id)){
                      let postAuthor = accounts.filter((elt) => {
                        return elt.id === post.author
                      });                
                      return (
                        <div className="post" key={index}>
                          <div className="post-header">
                            {postAuthor[0].profile_picture ? 
                              <img className="post-author-image" src={postAuthor[0].profile_picture} alt=""/>
                              : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
                            <p>{postAuthor[0].first_name} {postAuthor[0].last_name}</p>
                          </div>
                          <p className="post-text">{post.body}</p>
                          <img className="post-image" src={post.image} alt=""/>
                        </div>
                      )
                } else {
                  return null;
                }
                }):""}
          </div>
        </div>
      </div>
    );
  }
  
  export default Feed;