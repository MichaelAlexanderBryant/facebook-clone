import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function FeedFriends(props){

    let {user, userInfo} = useContext(AuthContext)

    
    return(
        <div className="user-list-container">
            <h1 className="contacts-header">Friends</h1>
            {userInfo.friends && userInfo.friends.length > 0 ?
            <ul className="user-list">
            {props.accounts.map((person, index) => {
                if ((person.id !== user.user_id) && (userInfo.friends.includes(person.id))) {
                return (
                <li key={"contact " + index}>
                    <a href={"/profile/" + person.id} className="user-list-item">
                    {person.profile_picture ? 
                        <img className="post-author-image" src={person.profile_picture} alt=""/>
                        : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
                    <span>{person.first_name + " " + person.last_name}</span>
                    </a>
                </li>)
                } else { return null }
            })}
            </ul>
            : <p className="no-contacts">No friends to display</p>}
      </div>
    )
}

export default FeedFriends;