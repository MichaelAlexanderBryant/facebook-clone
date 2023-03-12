import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import facebookLogo from '../assets/facebook-logo.svg';
import defaultProfilePicture from '../assets/default-profile-picture.png';

function NavBar() {

    let {user, userInfo, logoutUser} = useContext(AuthContext)

    if (user && userInfo && logoutUser) {
        return (
            <div className="navbar-container">
                <a href="/feed"><img src={facebookLogo} alt="Facebook Logo" className='navbar-logo'/></a>
                <div className="nav-links">
                    <a href={"/profile/" + user.user_id}>
                    {userInfo.profile_picture ? 
                        <img className="nav-picture" src={userInfo.profile_picture} alt={userInfo.first_name + " " + userInfo.last_name}/>
                    : <img className="nav-picture" src={defaultProfilePicture} alt=""/>}
                    </a>
                    <div onClick={logoutUser}><p>Log Out</p></div>
                </div>
            </div>
        )
                }
}

export default NavBar;