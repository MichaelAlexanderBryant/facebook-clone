import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import FriendRequests from "../components/FriendRequests";
import { getAccounts } from "../utils/getAccounts";
import { getFriendRequests } from "../utils/getFriendRequests";
import NavBar from "../components/NavBar";
import MiniSidebar from "../components/MiniSidebar";
import FriendsList from "../components/FriendsList";

function Friends() {

    let [friendRequests, setFriendRequests] = useState(null);
    let [accounts, setAccounts] = useState(null);
    let {authTokens, user, logoutUser} = useContext(AuthContext);


    useEffect(() => {
        getFriendRequests(authTokens, user, setFriendRequests, logoutUser);
        getAccounts(authTokens, setAccounts, logoutUser);
    },[])

    if (friendRequests && accounts) {
        return (
            <div>
                <NavBar/>
                <MiniSidebar/>
                <div className="allusers-container">
                    <FriendRequests friendRequests={friendRequests} accounts={accounts} />
                    <FriendsList accounts={accounts}/>
                </div>
            </div>
        )
    }
}

export default Friends;