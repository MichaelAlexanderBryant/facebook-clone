import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import ProfileFriends from "../components/ProfileFriends";
import Posts from "../components/Posts";

function Profile() {

    let currentUrl = window.location.href
    let userId = currentUrl.slice(currentUrl.indexOf("profile/")+8)

    let [posts, setPosts] = useState([]);
    let [profile, setProfile] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext);

    let getProfile = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/accounts/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access) 
            },
        });
        let data = await response.json()

        if (response.status === 200) {
            setProfile(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        };
    };

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
            data = data.filter(post => {
                return (parseInt(post.author) === parseInt(userId))
            })
            setPosts(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        };
    };

    useEffect(() => {
        getProfile();
        getPosts();
    }, []) 

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
                            {posts.length > 0 ?
                                <Posts account={profile} posts={posts} />
                                :<div className="post">No posts to display</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;