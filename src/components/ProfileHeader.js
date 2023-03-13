import defaultProfilePicture from "../assets/default-profile-picture.png";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ProfileHeader(props) {

    let {user, userInfo} = useContext(AuthContext);

    if (user && userInfo) {
        return (
            <div className="profile-header">
                <div className="center-profile-header">
                    <div className="left-side-profile-header">
                        {props.profile.profile_picture ? 
                        <img src={props.profile.profile_picture} alt="" className="profile-picture"/>
                        : <img src={defaultProfilePicture} alt="" className="profile-picture"/>}
                        <h1 className="profile-name">{props.profile.first_name + " " + props.profile.last_name}</h1>
                    </div>
                    <div className="right-side-profile-header">
                        {String(user.user_id) === props.userId ? 
                            <div><button type="button">Edit Profile</button></div>
                            : <div>
                                {userInfo.friends && userInfo.friends.includes(parseInt(props.userId)) ? 
                                    <button type="button">Unfriend</button>
                                    :<button type="button">Add Friend</button>}
                            </div>}
                    </div>
                </div>
            </div>
        )
                            }
}

export default ProfileHeader;