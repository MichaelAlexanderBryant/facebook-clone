import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import FriendRequests from "../components/FriendRequests";
import { getAccounts } from "../utils/getAccounts";
import { getFriendRequestsToUser } from "../utils/getFriendRequestsToUser";
import NavBar from "../components/NavBar";
import MiniSidebar from "../components/MiniSidebar";
import FriendsList from "../components/FriendsList";
import { putAccountFriend } from "../utils/putAccountFriend";
import { deleteFriendRequest } from "../utils/deleteFriendRequest";
import { getAccount } from "../utils/getAccount";

function Friends() {

    let [accounts, setAccounts] = useState(null);
    let [userDeleted, setUserDeleted] = useState(false);
    let {authTokens, user, logoutUser} = useContext(AuthContext);

    let currentUrl = window.location.href
    let userId = currentUrl.slice(currentUrl.indexOf("friends/")+8)

    let [incomingFriendRequestsIds, setIncomingFriendRequestsIds] = useState(null)
    let [incomingFriendRequests, setIncomingFriendRequests] = useState(null)
    let [userFriends, setUserFriends] = useState(null)

    useEffect(() => {

        getAccounts(authTokens, setAccounts, logoutUser);

        let fetchIncomingFriendRequests = async () => {
            let data = await getFriendRequestsToUser(authTokens, user, logoutUser);
            let incomingFriendRequestArray = data.map(elt => {return (elt.from_user)})
            setIncomingFriendRequests(incomingFriendRequestArray);

            let incomingFriendRequestsIdsArray = data.map(elt => {return (elt.id)})
            setIncomingFriendRequestsIds(incomingFriendRequestsIdsArray);
        }
        fetchIncomingFriendRequests();

        let fetchUserFriends= async () => {
            let account =  await getAccount(authTokens,user.user_id)
            let data = account['friends'];
            setUserFriends(data);
        }
        fetchUserFriends();
        }

    ,[])

    let acceptRequestandDelete = (requestId, toUserId, fromUserId) => {
        let executeRequest = async() => {
            await putAccountFriend(authTokens, toUserId, fromUserId);
            await deleteFriendRequest(authTokens, requestId, logoutUser);
            setIncomingFriendRequests(null);
            setAccounts(null);
            setUserFriends(null);
            setUserDeleted(true);
        }
        executeRequest();
    }

    useEffect(() => {
        getAccounts(authTokens, setAccounts, logoutUser);

        let fetchIncomingFriendRequests = async () => {
            let data = await getFriendRequestsToUser(authTokens, user, logoutUser);
            let incomingFriendRequestArray = data.map(elt => {return (elt.from_user)})
            setIncomingFriendRequests(incomingFriendRequestArray);

            let incomingFriendRequestsIdsArray = data.map(elt => {return (elt.id)})
            setIncomingFriendRequestsIds(incomingFriendRequestsIdsArray);
        }
        fetchIncomingFriendRequests();

        let fetchUserFriends= async () => {
            let account =  await getAccount(authTokens,user.user_id)
            let data = account['friends'];
            setUserFriends(data);
        }
        fetchUserFriends();
        
        setUserDeleted(false)
    }, [userDeleted])

    let removeFriend = (e, friendToRemove) => {
        putAccountFriend(authTokens, user.user_id, friendToRemove);
        putAccountFriend(authTokens, friendToRemove, user.user_id);
    }

    if (accounts && incomingFriendRequests && userFriends) {
        return (
            <div>
                <NavBar/>
                <MiniSidebar/>
                <div className="allusers-container">
                    {parseInt(userId) === user.user_id ?
                    <FriendRequests incomingFriendRequests={incomingFriendRequests}
                                    incomingFriendRequestsIds={incomingFriendRequestsIds}
                                    accounts={accounts}
                                    acceptRequestandDelete={acceptRequestandDelete}/>
                    : null}
                    <FriendsList accounts={accounts}
                                    userId={userId}
                                    userFriends={userFriends}
                                    removeFriend={removeFriend}/>
                </div>
            </div>
        )
    }
}

export default Friends;