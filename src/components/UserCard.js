import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";
import { postFriendRequest } from "../utils/postFriendRequest";
import { getFriendRequestsFromUser } from "../utils/getFriendRequestsFromUser";

function UserCard(props) {

    let {authTokens, user, userInfo, logoutUser} = useContext(AuthContext)
    let [friendRequests, setFriendRequests] = useState(null)
    let [friendRequestSent, setFriendRequestSent] = useState(false)

    useEffect(() => {
        let fetchFriendRequests = async () => {
            await getFriendRequestsFromUser(authTokens, user, setFriendRequests, logoutUser);
        }
        fetchFriendRequests();
    },[])

    useEffect(() => {
        if (friendRequests){
            let pendingRequest = friendRequests.filter(request => {
                return props.person.id === request;
            })
            if (pendingRequest.length > 0) {
                setFriendRequestSent(true)
            }}
    }, [friendRequests])

    let handleAddFriend = (e) => {
        postFriendRequest(e, authTokens, user, props.person.id);
        setFriendRequestSent(true);
    }


    if (user && userInfo && friendRequests) {
        return (
            <div className="user-card">
                <div className="allusers-img-name">
                    <div className="allusers-img-container">
                        <a href={"/profile/" + props.person.id}>
                            {props.person.profile_picture ?
                            <img src={props.person.profile_picture} alt="" className="allusers-img"/>
                            : <img src={defaultProfilePicture} alt="" className="allusers-img"/>}
                        </a>
                    </div>
                    <a href={"/profile/" + props.person.id}>
                        <p className="allusers-name">{props.person.first_name + " " + props.person.last_name}</p>
                    </a>
                </div>
                {(props.friendsList) ? (
                        parseInt(props.person.id) !== parseInt(user.user_id) ?
                            (userInfo.friends && userInfo.friends.includes(props.person.id) ?
                            <button type="button" className="allusers-btn">Unfriend</button>
                            : <button type="button" className="allusers-btn">Add Friend</button>)
                            : null) 
                        :(
                props.display==="allusers" ? (parseInt(props.person.id) !== parseInt(user.user_id) ?
                    (userInfo.friends && userInfo.friends.includes(props.person.id) ?
                    <button type="button" className="allusers-btn">Unfriend</button>
                    : (!friendRequestSent? <button type="button" className="allusers-btn" onClick={handleAddFriend}>Add Friend</button>
                    : <button type="button" className="allusers-btn" disabled={true}>Friend Request Pending</button>))
                    : null)
                    : (parseInt(props.person.id) !== parseInt(user.user_id) ?
                        (userInfo.friends && userInfo.friends.includes(props.person.id) ?
                        null
                        : <button type="button" className="allusers-btn">Accept</button>)
                        : null))
                }
            </div>
        )
        }
}

export default UserCard;