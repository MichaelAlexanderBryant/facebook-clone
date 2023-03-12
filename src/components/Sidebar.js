import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";
import homeIcon from "../assets/home-icon.png";
import friendsIcon from "../assets/friends-icon.png";
import allUsersIcon from "../assets/all-users-icon.png";

function Sidebar() {

    let {user, userInfo} = useContext(AuthContext)

    if (user && userInfo) {
      return (
          <div className="menu-container">
            <ul className="top-menu-list">
              <li>
                <a href="/feed" className="menu-item">
                  <img src={homeIcon} alt="Home" className="icon"/>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href={"/profile/" + user.user_id} className="menu-item">
                {userInfo.profile_picture ? 
                  <img className="icon" src={userInfo.profile_picture} alt={userInfo.first_name + " " + userInfo.last_name}/>
                : <img className="icon" src={defaultProfilePicture} alt=""/>}
                <span>{userInfo.first_name + " " + userInfo.last_name}</span>
                </a>
                </li>
            </ul>
            <ul className="bottom-menu-list">
            <li>
                <a href={"/friends/" + user.user_id} className="menu-item">
                  <img src={friendsIcon} alt="Friends" className="icon"/>
                  <span>Friends</span>
                </a>
              </li>
              <li>
                <a href="/allusers" className="menu-item">
                  <img src={allUsersIcon} alt="All users" className="icon"/>
                  <span>All Users</span>
                </a>
              </li>
            </ul>
          </div>
      )
                }
}

export default Sidebar;