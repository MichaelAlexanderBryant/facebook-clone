import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";
import { getFriendRequestsFromUser } from "../utils/api/getFriendRequestsFromUser";
import { deleteFriendRequest } from "../utils/api/deleteFriendRequest";
import { getAccount } from "../utils/api/getAccount";


function UserCard(props) {

    let {authTokens, user, logoutUser} = useContext(AuthContext)
    let [userFriends, setUserFriends] = useState(null);
    let [currentFriend, setCurrentFriend] = useState(null);
    let [disableButton, setDisableButton] = useState(false);
    let [pendingFriendRequest, setPendingFriendRequest] = useState(false)


    useEffect(() => {
        let fetchUserFriends = async () => {
            let data = await getAccount(authTokens, user.user_id);
            let friends = data['friends']
            setUserFriends(friends)
            friends.includes(props.person.id) ? setCurrentFriend(true) : setCurrentFriend(false)
        }
        fetchUserFriends();

        let fetchFriendRequests = async () => {
            let data = await getFriendRequestsFromUser(authTokens, user, logoutUser)
            data = data.map(request => {return request.to_user})
            if (data.includes(props.person.id)) {
                setPendingFriendRequest(true);
            }
        }
        fetchFriendRequests();
        
    },[])

    let handleFriendAccept = () => {
        props.acceptRequestandDelete(props.requestId, user.user_id, props.person.id);
    }

    let handleAddFriend = () => {
        setDisableButton(true);
        let addFriend = async () => {
            await props.addFriend(props.person.id);
            setPendingFriendRequest(true);
            setCurrentFriend(false);
            setDisableButton(false);
        }
        addFriend();
    }

    let handleRemoveFriend = () => {
        setDisableButton(true);
        setCurrentFriend(false);
        let removeFriend = async () => {
            await props.removeFriend(props.person.id);
            setPendingFriendRequest(false);
            setCurrentFriend(false);
            setDisableButton(false);
        }
        removeFriend();
    }
    let handleCancelRequest = () => {
        setDisableButton(true);
        let fetchFriendRequestAndDelete = async () => {
            let data = await getFriendRequestsFromUser(authTokens, user, logoutUser)
            data = data.filter(request => {return (request.to_user === props.person.id) && (request.from_user === user.user_id)})
            await deleteFriendRequest(authTokens, data[0].id, logoutUser);
            setCurrentFriend(false);
            setPendingFriendRequest(false);
            setDisableButton(false);
        }
        fetchFriendRequestAndDelete();
    }

    if (user && userFriends && props.incomingFriendRequests && props.sentFriendRequests && (currentFriend !== null)) {
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
                        (userFriends && userFriends.includes(props.person.id) && currentFriend ?
                        <button type="button" className="allusers-btn" onClick={handleRemoveFriend} disabled={disableButton}>Unfriend</button>
                        : (pendingFriendRequest ?
                        <button type="button" className="allusers-btn" onClick={handleCancelRequest} disabled={disableButton}>Cancel Request</button>
                        :<button type="button" className="allusers-btn" onClick={handleAddFriend} disabled={disableButton}>Add friend</button>))
                        : null)
                        :(
                props.display==="allusers" ? (parseInt(props.person.id) !== parseInt(user.user_id) ?
                    (userFriends && userFriends.includes(props.person.id) && currentFriend ?
                    <button type="button" className="allusers-btn" onClick={handleRemoveFriend} disabled={disableButton}>Unfriend</button>
                    : (pendingFriendRequest ?
                    <button type="button" className="allusers-btn" onClick={handleCancelRequest} disabled={disableButton}>Cancel Request</button>
                    :<button type="button" className="allusers-btn" onClick={handleAddFriend} disabled={disableButton}>Add friend</button>))
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