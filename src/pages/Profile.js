import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";

function Profile() {

    let currentUrl = window.location.href
    let userId = currentUrl.slice(currentUrl.indexOf("profile/")+8)

    let [profile, setProfile] = useState([]);
    let {user, authTokens, logoutUser} = useContext(AuthContext);

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
    }

    useEffect(() => {
        getProfile();
    }, []) 

    return (
        <div>
            <NavBar/>
            <MiniSidebar/>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="center-profile-header">
                        <div className="left-side-profile-header">
                            <img src={profile.profile_picture} alt="" className="profile-picture"/>
                            <h1 className="profile-name">{profile.first_name + " " + profile.last_name}</h1>
                        </div>
                        {String(user.user_id) === userId ? 
                            <div><button type="button">Edit Profile</button></div>
                            : <div><button type="button">Add Friend</button><button type="button">Message User</button></div>}
                    </div>
                </div>
                <div className="profile-content">
                    <div className="center-profile-content">
                        <div className="grid-profile-content">
                            <div className="friends">
                                <div className="friends-header"><span>Friends</span><span>See all friends</span></div>
                                <div>{profile.friends ? (profile.friends.length == 1 ? profile.friends.length + " friend":
                                        profile.friends.length + " friends"):null}</div>
                            </div>
                        
                            <div className="posts"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;