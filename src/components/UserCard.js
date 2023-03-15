import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";
import { postFriendRequest } from "../utils/postFriendRequest";
import { getFriendRequestsFromUser } from "../utils/getFriendRequestsFromUser";
import { getAccount } from "../utils/getAccount";


function UserCard(props) {

    let {authTokens, user, logoutUser} = useContext(AuthContext)
    let [friendRequests, setFriendRequests] = useState(null)
    let [friendRequestSent, setFriendRequestSent] = useState(false)
    let [userFriends, setUserFriends] = useState(null)

    useEffect(() => {
        let fetchFriendRequests = async () => {
            await getFriendRequestsFromUser(authTokens, user, setFriendRequests, logoutUser);
            if (friendRequests){
                setFriendRequests(friendRequests.map(elt => {return (elt.to_user)}))}
        }
        fetchFriendRequests();

        let fetchAccount = async () => {
            let account =  await getAccount(authTokens,user.user_id)
            if (account) {
                setUserFriends(account['friends']);
            }
        }
        fetchAccount();
        }
    ,[])

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

    let handleFriendAccept = () => {
        props.deleteAndRerender(props.requestId, user.user_id, props.person.id);
    }



    if (user && userFriends && friendRequests) {
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
                            (userFriends && userFriends.includes(props.person.id) ?
                            <button type="button" className="allusers-btn">Unfriend</button>
                            : <button type="button" className="allusers-btn">Add friend</button>)
                            : null) 
                        :(
                props.display==="allusers" ? (parseInt(props.person.id) !== parseInt(user.user_id) ?
                    (userFriends && userFriends.includes(props.person.id) ?
                    <button type="button" className="allusers-btn">Unfriend</button>
                    : (!friendRequestSent? <button type="button" className="allusers-btn" onClick={handleAddFriend}>Add friend</button>
                    : <button type="button" className="allusers-btn" disabled={true}>Cancel request</button>))
                    : null)
                    : (parseInt(props.person.id) !== parseInt(user.user_id) ?
                        (userFriends && userFriends.includes(props.person.id) ?
                        null
                        : <button type="button" className="allusers-btn" onClick={handleFriendAccept}>Accept</button>)
                        : null))
                }
            </div>
        )
        }
}

export default UserCard;