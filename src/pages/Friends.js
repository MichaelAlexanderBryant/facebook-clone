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

function Friends() {

    let [friendRequests, setFriendRequests] = useState(null);
    let [accounts, setAccounts] = useState(null);
    let [userDeleted, setUserDeleted] = useState(false);
    let {authTokens, user, logoutUser} = useContext(AuthContext);

    let currentUrl = window.location.href
    let userId = currentUrl.slice(currentUrl.indexOf("friends/")+8)


    useEffect(() => {
        getFriendRequestsToUser(authTokens, user, setFriendRequests, logoutUser);
        getAccounts(authTokens, setAccounts, logoutUser);
    },[])

    let deleteRequestAndRerender = (requestId, toUserId, fromUserId) => {
        let executeRequest = async() => {
            await putAccountFriend(authTokens, toUserId, fromUserId);
            await deleteFriendRequest(authTokens, requestId, logoutUser);
            setFriendRequests(null);
            setAccounts(null);
            setUserDeleted(true);
        }
        executeRequest();
    }

    useEffect(() => {
        getFriendRequestsToUser(authTokens, user, setFriendRequests, logoutUser);
        getAccounts(authTokens, setAccounts, logoutUser);
        setUserDeleted(false)
    }, [userDeleted])

    if (friendRequests && accounts) {
        return (
            <div>
                <NavBar/>
                <MiniSidebar/>
                <div className="allusers-container">
                    {parseInt(userId) === user.user_id ?
                    <FriendRequests friendRequests={friendRequests} accounts={accounts} deleteAndRerender={deleteRequestAndRerender}/>
                    : null}
                    <FriendsList accounts={accounts} userId={userId}/>
                </div>
            </div>
        )
    }
}

export default Friends;