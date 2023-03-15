import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";
import { postFriendRequest } from "../utils/postFriendRequest";
import { getFriendRequestsFromUser } from "../utils/getFriendRequestsFromUser";
import { getAccount } from "../utils/getAccount";
import { getFriendRequestsToUser } from "../utils/getFriendRequestsToUser";


function UserCard(props) {

    let {authTokens, user,logoutUser} = useContext(AuthContext)
    let [incomingFriendRequests, setIncomingFriendRequests] = useState(null)
    let [sentFriendRequests, setSentFriendRequests] = useState(null)
    let [friendRequestSent, setFriendRequestSent] = useState(false)
    let [userFriends, setUserFriends] = useState(null)

    useEffect(() => {
        let fetchIncomingFriendRequests = async () => {
            await getFriendRequestsFromUser(authTokens, user, setIncomingFriendRequests, logoutUser);
            if (incomingFriendRequests){
                setIncomingFriendRequests(incomingFriendRequests.map(elt => {return (elt.to_user)}))}
        }
        fetchIncomingFriendRequests();

        let fetchSentFriendRequests = async () => {
            await getFriendRequestsToUser(authTokens, user, setSentFriendRequests, logoutUser);
            if (sentFriendRequests){
                setSentFriendRequests(sentFriendRequests.map(elt => {return (elt.from_user)}))}
        }
        fetchSentFriendRequests();

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
        if (incomingFriendRequests){
            let pendingRequest = incomingFriendRequests.filter(request => {
                return props.person.id === request;
            })
            if (pendingRequest.length > 0) {
                setFriendRequestSent(true)
            }}
    }, [incomingFriendRequests])

    let handleAddFriend = (e) => {
        postFriendRequest(e, authTokens, user, props.person.id);

        let fetchSentFriendRequests = async () => {
            await getFriendRequestsToUser(authTokens, user, setSentFriendRequests, logoutUser);
            if (sentFriendRequests){
                setSentFriendRequests(sentFriendRequests.map(elt => {return (elt.from_user)}))}
        }
        fetchSentFriendRequests();

        setFriendRequestSent(true);
    }

    let handleFriendAccept = () => {
        props.deleteAndRerender(props.requestId, user.user_id, props.person.id);
    }



    if (user && userFriends && incomingFriendRequests && sentFriendRequests) {
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
                    : (sentFriendRequests.includes(props.person.id)? <button type="button" className="allusers-btn" onClick={handleAddFriend}>Add friend</button>
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