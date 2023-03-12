import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import FriendRequests from "../components/FriendRequests";

function Friends() {

    let [friendRequests, setFriendRequests] = useState([]);
    let [accounts, setAccounts] = useState([]);
    let {authTokens, user, userInfo, logoutUser} = useContext(AuthContext);

    let getFriendRequests = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/accounts/friend_requests/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access) 
            }
        })
        let data = await response.json()
    
        if (response.status === 200) {
            data = data.filter(elt => {
                return (parseInt(elt.to_user) === parseInt(user.user_id))
            })
            data = data.map(elt => {
                return (elt.from_user)
            })
            setFriendRequests(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        };
    };

    let getAccounts = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/accounts/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access) 
            }
        })
        let data = await response.json()
    
        if (response.status === 200) {
            setAccounts(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        };
    };

    useEffect(() => {
        getFriendRequests();
        getAccounts();
    },[])

    return (
        <div>
            <FriendRequests friendRequests={friendRequests} accounts={accounts}/>
            <Friends accounts={accounts}/>
        </div>
    )
}

export default Friends;