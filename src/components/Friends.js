import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function Friends(props) {
    let {user, userInfo} = useContext(AuthContext);
    return (
        <div>
            <h1>Friends</h1>
            <div className="card-container">
                {   
                    (userInfo.friends && userInfo.friends.length === 0) ?
                            <p>No friends to display</p> : null
                }
                    
                {props.accounts ? props.accounts.map((person, idx) => {
                        if (userInfo.friends && userInfo.friends.includes(person.id)) {
                        return (
                        <div className="user-card" key={idx}>
                            <div className="allusers-img-name">
                                <div className="allusers-img-container">
                                    <a href={"/profile/" + person.id}>
                                        {person.profile_picture ?
                                        <img src={person.profile_picture} alt="" className="allusers-img"/>
                                        : <img src={defaultProfilePicture} alt="" className="allusers-img"/>
                                        }
                                    </a>
                                </div>
                                <a href={"/profile/" + person.id}>
                                    <p className="allusers-name">{person.first_name + " " + person.last_name}</p>
                                </a>
                            </div>
                            {parseInt(person.id) !== parseInt(user.user_id) ?
                                (userInfo.friends && userInfo.friends.includes(person.id) ?
                                <button type="button" className="allusers-btn">Unfriend</button>
                                : <button type="button" className="allusers-btn">Add Friend</button>)
                                : null}
                        </div>
                    )} else return null;
                }):null}
            </div>
        </div>
    )
}

export default Friends;