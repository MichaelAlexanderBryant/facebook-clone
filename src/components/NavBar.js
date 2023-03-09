import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';

function NavBar() {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <div onClick={logoutUser}><p>Log Out</p></div>
        </div>
    )
}

export default NavBar;