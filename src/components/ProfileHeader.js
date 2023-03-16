import defaultProfilePicture from "../assets/default-profile-picture.png";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getFriendRequestsFromUser } from "../utils/api/getFriendRequestsFromUser";
import { getAccount } from "../utils/api/getAccount";
import { deleteFriendRequest } from "../utils/api/deleteFriendRequest";

function ProfileHeader(props) {

    let {authTokens, user, logoutUser} = useContext(AuthContext);
    let [disableButton, setDisableButton] = useState(false);
    let [pendingFriendRequest, setPendingFriendRequest] = useState(false)
    let [currentFriend, setCurrentFriend] = useState(null);

    useEffect(()=>{
        let fetchFriendRequests = async () => {
            let data = await getFriendRequestsFromUser(authTokens, user, logoutUser)
            data = data.map(request => {return request.to_user})
            if (data.includes(props.profile.id)) {
                setPendingFriendRequest(true);
            }
        }
        fetchFriendRequests();

        let fetchUserFriends = async () => {
            let data = await getAccount(authTokens, user.user_id)
            data = data['friends']
            if (data.includes(props.profile.id)) {
                setCurrentFriend(true);
            } else {
                setCurrentFriend(false);
            }
        }
        fetchUserFriends();

    },[])

    let handleRemoveFriend = () => {
        setDisableButton(true);
        let removeFriends = async () => {
            await props.removeFriend(props.profile.id);
            setCurrentFriend(false);
            setPendingFriendRequest(false);
            setDisableButton(false);
        }
        removeFriends();
        
    }

    let handleAddFriend = () => {
        setDisableButton(true);
        let addFriends = async () => {
            await props.addFriend(props.profile.id);
            setPendingFriendRequest(true);
            setDisableButton(false);
        }
        addFriends();

    }

    let handleCancelRequest = () => {
        setDisableButton(true);
        let fetchFriendRequestAndDelete = async () => {
            let data = await getFriendRequestsFromUser(authTokens, user, logoutUser)
            data = data.filter(request => {return (request.to_user === props.profile.id) && (request.from_user === user.user_id)})
            await deleteFriendRequest(authTokens, data[0].id, logoutUser);
            setCurrentFriend(false);
            setPendingFriendRequest(false);
            setDisableButton(false);
        }
        fetchFriendRequestAndDelete();
    }

    if (user && currentFriend !== null) {
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
                                    { currentFriend ? 
                                        <button className="header-button" type="button"
                                                        onClick={handleRemoveFriend}
                                                        disabled={disableButton}>Unfriend</button>
                                        : ((pendingFriendRequest) ?                                             
                                        <button className="header-button" type="button"
                                                onClick={handleCancelRequest}
                                                disabled={disableButton}>Cancel request</button> :
                                            <button className="header-button" type="button"
                                                        onClick={handleAddFriend}
                                                        disabled={disableButton}>Add Friend</button>)}
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
                            }
}

export default ProfileHeader;