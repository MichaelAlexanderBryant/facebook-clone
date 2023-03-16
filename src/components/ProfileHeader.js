import defaultProfilePicture from "../assets/default-profile-picture.png";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function ProfileHeader(props) {

    let {authTokens, user, userInfo} = useContext(AuthContext);
    let [wasUnfriended, setWasUnfriended] = useState(!userInfo || !userInfo.friends.includes(props.profile.id));
    let [disableButton, setDisableButton] = useState(false);

    let handleRemoveFriend = () => {
        setWasUnfriended(true);
        setDisableButton(true);
        let removeFriends = async () => {
            await props.removeFriend(props.profile.id);
            setDisableButton(false)
        }
        removeFriends();
        
    }

    let handleAddFriend = () => {
        setWasUnfriended(false);
        setDisableButton(true);
        let addFriends = async () => {
            props.addFriend(props.profile.id);
            setDisableButton(true);
        }
        addFriends();
    }

    if (user && userInfo) {
        return (
            <div className="profile-header">
                <div className="center-profile-header">
                    <div className="top-header"></div>
                    <div className="bottom-header">
                        <div className="left-side-profile-header">
                            <div className="profile-img-container">
                                <div className="circular-div">
                                    {props.profile.profile_picture ? 
                                    <img src={props.profile.profile_picture} alt="" className="profile-picture"/>
                                    : <img src={defaultProfilePicture} alt="" className="profile-picture"/>}
                                </div>
                            </div>
                            <h1 className="profile-name">{props.profile.first_name + " " + props.profile.last_name}</h1>
                        </div>
                        <div className="right-side-profile-header">
                            {String(user.user_id) === props.userId ? 
                                <div><button className="header-button" type="button">Edit Profile</button></div>
                                : <div>
                                    {(userInfo.friends && userInfo.friends.includes(parseInt(props.userId))) || !wasUnfriended ? 
                                        <button className="header-button" type="button"
                                                        onClick={handleRemoveFriend}
                                                        disabled={disableButton? 'disabled':null}>Unfriend</button>
                                        :<button className="header-button" type="button"
                                                        onClick={handleAddFriend}
                                                        disabled={disableButton? 'disabled':null}>Add Friend</button>}
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
                            }
}

export default ProfileHeader;