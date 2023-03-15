import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";


function UserCard(props) {

    let {user} = useContext(AuthContext)
    let [friendRequestSent, setFriendRequestSent] = useState(false);
    let [friendRemoved, setFriendRemoved] = useState(false);

    let handleFriendAccept = () => {
        props.deleteRequestAndRerender(props.requestId, user.user_id, props.person.id);
    }

    let handleAddFriend = (e) => {
        setFriendRequestSent(true);
        props.addFriend(e, props.person.id);
    }

    let handleRemoveFriend = (e) => {
        setFriendRemoved(true);
        props.removeFriend(e, props.person.id);
    }

    if (user && props.userFriends && props.incomingFriendRequests && props.sentFriendRequests) {

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
                            (props.userFriends && props.userFriends.includes(props.person.id) ?
                            <button type="button" className="allusers-btn">Unfriend</button>
                            : <button type="button" className="allusers-btn">Add friend</button>)
                            : null) 
                        :(
                props.display==="allusers" ? (parseInt(props.person.id) !== parseInt(user.user_id) ?
                    (props.userFriends && props.userFriends.includes(props.person.id) && !friendRemoved ?
                    <button type="button" className="allusers-btn" onClick={handleRemoveFriend}>Unfriend</button>
                    : (!props.sentFriendRequests.includes(props.person.id) && (!friendRequestSent)? <button type="button" className="allusers-btn" onClick={handleAddFriend}>Add friend</button>
                    : <button type="button" className="allusers-btn" disabled={true}>Cancel request</button>))
                    : null)
                    : (parseInt(props.person.id) !== parseInt(user.user_id) ?
                        (props.userFriends && props.userFriends.includes(props.person.id) ?
                        null
                        : <button type="button" className="allusers-btn" onClick={handleFriendAccept}>Accept</button>)
                        : null))
                }
            </div>
        )
        }
}

export default UserCard;