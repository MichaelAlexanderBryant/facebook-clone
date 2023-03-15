import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import ProfileFriends from "../components/ProfileFriends";
import Posts from "../components/Posts";
import { getProfile } from "../utils/api/getProfile";
import { getPosts } from "../utils/api/getPosts";
import NewPost from "../components/NewPost";
import { postPost } from "../utils/api/postPost";
import { putPostLike } from "../utils/api/putPostLike";

function Profile() {

    let currentUrl = window.location.href
    let userId = currentUrl.slice(currentUrl.indexOf("profile/")+8)

    let [posts, setPosts] = useState(null);
    let [profile, setProfile] = useState(null);
    let {user, authTokens, logoutUser} = useContext(AuthContext);

    useEffect(() => {
        getProfile(userId, authTokens, setProfile, logoutUser);
        getPosts(authTokens, setPosts, logoutUser, userId);
    }, []) 

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

    if (posts && profile) {
        return (
            <div>
                <NavBar/>
                <MiniSidebar currentUser={profile.id}/>
                <div className="profile-container">
                    <ProfileHeader profile={profile} userId={userId} />
                    <div className="profile-content">
                        <div className="center-profile-content">
                            <div className="flex-profile-content">
                                <ProfileFriends profile={profile} />
                                <div>
                                    {profile.id === user.user_id ?
                                    <NewPost submitPost={submitPost}/>
                                    : null
                                    }
                                    {posts.length > 0 ?
                                        <Posts account={profile} posts={posts} handlePostLike={handlePostLike}/>
                                        :<div className="post">No posts to display</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
                            }
}

export default Profile;