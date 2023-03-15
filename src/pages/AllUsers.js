import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar"
import NavBar from "../components/NavBar"
import UserCard from "../components/UserCard";
import AuthContext from "../context/AuthContext";
import { getAccount } from "../utils/api/getAccount";
import { getAccounts } from "../utils/api/getAccounts";
import { getFriendRequestsFromUser } from "../utils/api/getFriendRequestsFromUser";
import { getFriendRequestsToUser } from "../utils/api/getFriendRequestsToUser";
import { postFriendRequest } from "../utils/api/postFriendRequest";
import { putAccountFriend } from "../utils/api/putAccountFriend";



function AllUsers() {

    let [accounts, setAccounts] = useState(null);
    let {authTokens, user, logoutUser} = useContext(AuthContext);

    let [incomingFriendRequests, setIncomingFriendRequests] = useState(null)
    let [sentFriendRequests, setSentFriendRequests] = useState(null)
    let [userFriends, setUserFriends] = useState(null)

    useEffect(() => {

        getAccounts(authTokens, setAccounts, logoutUser);

        let fetchIncomingFriendRequests = async () => {
            let data = await getFriendRequestsToUser(authTokens, user, logoutUser);
            let incomingFriendRequestArray = data.map(elt => {return (elt.from_user)})
            setIncomingFriendRequests(incomingFriendRequestArray);
        }
        fetchIncomingFriendRequests();

        let fetchSentFriendRequests = async () => {
            let data = await getFriendRequestsFromUser(authTokens, user, logoutUser);
            let sentFriendRequestArray = data.map(elt => {return (elt.to_user)})
            setSentFriendRequests(sentFriendRequestArray);
        }
        fetchSentFriendRequests();

        let fetchAccount = async () => {
            let account =  await getAccount(authTokens,user.user_id)
            let data = account['friends'];
            setUserFriends(data);
        }
        fetchAccount();
        }

    ,[])

    let addFriend = (e, toUserId) => {
        postFriendRequest(e,authTokens, user, toUserId)
    }

    let removeFriend = (e, friendToRemove) => {
        putAccountFriend(authTokens, user.user_id, friendToRemove);
        putAccountFriend(authTokens, friendToRemove, user.user_id);
    }

    let acceptFriend = (e) => {


    }

    if (accounts && sentFriendRequests && incomingFriendRequests && userFriends) {
        return (
            <div>
                <NavBar/>
                <MiniSidebar/>
                <div className="allusers-container">
                        <div>
                            <h1>All Users</h1>
                            <div className="card-container">
                                {accounts ? accounts.map((person, idx) => {
                                    return <UserCard display="allusers"
                                                        person={person}
                                                        userFriends={userFriends}
                                                        sentFriendRequests={sentFriendRequests}
                                                        incomingFriendRequests={incomingFriendRequests}
                                                        addFriend={addFriend}
                                                        removeFriend={removeFriend}
                                                        acceptFriend={acceptFriend}
                                                        key={idx} />})
                                    :null}
                            </div>
                        </div>
                </div>
            </div>
        )
                            }
}

export default AllUsers;