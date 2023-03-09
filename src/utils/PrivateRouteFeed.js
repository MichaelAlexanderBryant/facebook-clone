import { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRouteFeed = () => {
    let {user} = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRouteFeed;