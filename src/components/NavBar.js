import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import facebookLogo from '../assets/facebook-logo.svg';

function NavBar() {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <img src={facebookLogo} alt="Facebook Logo" className='navbar-logo'/>
            <div onClick={logoutUser}><p>Log Out</p></div>
        </div>
    )
}

export default NavBar;