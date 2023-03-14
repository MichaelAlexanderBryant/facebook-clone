import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import ProfileFriends from "../components/ProfileFriends";
import Posts from "../components/Posts";
import { getProfile } from "../utils/getProfile";
import { getPosts } from "../utils/getPosts";
import NewPost from "../components/NewPost";
import { postPost } from "../utils/postPost";

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

    let [reload, setReload] = useState(false)

    function submitPost(e) {
      postPost(e, authTokens, user);
      setReload(true);
      e.target.reset();
    }
  
    useEffect(()=> {
      getPosts(authTokens, setPosts, logoutUser, userId);
      setReload(false);
    }, [reload])

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
                                        <Posts account={profile} posts={posts} />
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