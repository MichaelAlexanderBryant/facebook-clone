import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getProfile } from "../utils/api/getProfile";
import UserCard from "./UserCard";

function FriendsList(props) {

    let {authTokens, logoutUser} = useContext(AuthContext);
    let [profile, setProfile] = useState(null);

    useEffect(() => {
        let fetchProfile = async () => {
            let data = await getProfile(props.userId, authTokens, logoutUser);
            setProfile(data);
        }
        fetchProfile();
    }, [])

    
    if (profile) {
        return (
            <div>
                <h1>Friends</h1>
                <div className="card-container">
                    {   
                        (profile.friends && profile.friends.length === 0) ?
                                <p>No friends to display</p> : null
                    }
                        
                    {props.accounts ? props.accounts.map((person, idx) => {
                        if (profile.friends && profile.friends.includes(person.id)) {
                            return (
                                <UserCard friendsList={true}
                                            person={person}
                                            userFriends={props.userFriends}
                                            incomingFriendRequests={[]}
                                            sentFriendRequests={[]}
                                            addFriend={props.addFriend}
                                            removeFriend={props.removeFriend}
                                            key={idx} />
                        )} else return null;
                    }):null}
                </div>
            </div>
        )
            }
}

export default FriendsList;