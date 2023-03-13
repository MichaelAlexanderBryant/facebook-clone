import defaultProfilePicture from "../assets/default-profile-picture.png";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getAccounts } from "../utils/getAccounts";

function ProfileFriends(props) {

    let {authTokens, logoutUser, user, userInfo} = useContext(AuthContext);
    let [accounts, setAccounts] = useState(null);

    useEffect(()=>{
        getAccounts(authTokens, setAccounts, logoutUser);
    },[])


    if (user && accounts) {
        return (
            <div className="profile-friends">
                <div className="friends-header"><span>Friends</span>
                    <a href={"/friends/" + props.profile.id}><span className="all-friends-link">See all friends</span></a>
                </div>
                <div className="profile-friends-count">{props.profile.friends ? (props.profile.friends.length === 1 ? props.profile.friends.length + " friend":
                        props.profile.friends.length + " friends"):null}</div>
                <div className="profile-friends-grid">
                    {accounts.map((account,idx) => {
                        if (props.profile.friends.slice(0,9).includes(account.id)) {
                            return (
                                <div key={idx}>
                                    <a href={"/profile/" + account.id}>
                                        <div className="profile-friend-img-container">
                                            {(account.profile_picture?
                                            <img src={account.profile_picture}className="profile-friend-img" alt="" key={idx}/>
                                            : <img src={defaultProfilePicture}className="profile-friend-img" alt="" key={idx}/>
                                            )}
                                        </div>
                                        <p className="profile-friend-name">{account.first_name + " " + account.last_name}</p>
                                    </a>
                                </div>
                            )
                        } else {return null;}
                    })}
                </div>
            </div>
        )
    }
}

export default ProfileFriends;