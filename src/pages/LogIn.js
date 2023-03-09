import facebookLogo from "../assets/login-logo.svg"
import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';

function LogIn() {
    let {loginUser} = useContext(AuthContext);
    return (
      <div>
        <div className="left-panel">
            <img src={facebookLogo} alt="Facebook Logo"/>
            <h1>Connect with friends and the world around you on Facebook.</h1>
        </div>
        <div className="right-panel">
            <div className="LogIn-container">
                <form onSubmit={loginUser}>
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
  
  export default LogIn;