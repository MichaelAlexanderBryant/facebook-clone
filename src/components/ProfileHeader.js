import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function ProfileHeader(props) {

    let {user, userInfo} = useContext(AuthContext);

    return (
        <div className="profile-header">
            <div className="center-profile-header">
                <div className="left-side-profile-header">
                    <img src={props.profile.profile_picture} alt="" className="profile-picture"/>
                    <h1 className="profile-name">{props.profile.first_name + " " + props.profile.last_name}</h1>
                </div>
                {String(user.user_id) === props.userId ? 
                    <div><button type="button">Edit Profile</button></div>
                    : <div>
                        {userInfo.friends && userInfo.friends.includes(parseInt(props.userId)) ? 
                            <button type="button">Unfriend</button>
                            :<button type="button">Add Friend</button>}<button type="button">Message User</button>
                      </div>}
            </div>
        </div>
    )
}

export default ProfileHeader;