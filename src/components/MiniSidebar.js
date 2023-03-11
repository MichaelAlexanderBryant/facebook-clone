import { useContext} from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";
import homeIcon from "../assets/home-icon.png";
import friendsIcon from "../assets/friends-icon.png";
import allUsersIcon from "../assets/all-users-icon.png";

function MiniSidebar() {

    let {user, userInfo} = useContext(AuthContext)

    return (
        <div className="mini-menu">
            <div className="mini-menu-background">
                <div className="mini-menu-container">
                    <ul className="top-menu-list">
                    <li>
                        <a href="/feed" className="menu-item">
                            <img src={homeIcon} alt="Home" className="icon"/>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href={"/profile/" + user.user_id} className="menu-item">
                            {userInfo.profile_picture ? 
                            <img className="icon" src={userInfo.profile_picture} alt={userInfo.first_name + " " + userInfo.last_name}/>
                            : <img className="icon" src={defaultProfilePicture} alt=""/>}
                        </a>
                        </li>
                    </ul>
                    <ul className="bottom-menu-list">
                    <li className="menu-item">
                        <img src={friendsIcon} alt="Friends" className="icon"/>
                    </li>
                    <li className="menu-item">
                        <img src={allUsersIcon} alt="All users" className="icon"/>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MiniSidebar;