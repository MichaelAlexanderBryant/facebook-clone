import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import facebookLogo from '../assets/facebook-logo.svg';

function NavBar() {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div className="navbar-container">
            <a href="/feed"><img src={facebookLogo} alt="Facebook Logo" className='navbar-logo'/></a>
            <div className="nav-links">
                <div>My Profile</div>
                <div onClick={logoutUser}><p>Log Out</p></div>
            </div>
            
        </div>
    )
}

export default NavBar;