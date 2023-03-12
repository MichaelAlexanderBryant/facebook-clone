import facebookLogo from "../assets/facebook-logo.svg"
import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';

function LogIn() {
  
    let {loginUser} = useContext(AuthContext);


    return (
      <div className="login-container">
        <div className="left-panel">
            <div className="logo-subtitle-container">
              <img src={facebookLogo} alt="Facebook Logo" className="login-logo"/>
              <h1 className="subtitle">Connect with friends and the world around you on Facebook.</h1>
            </div>
        </div>
        <div className="right-panel">
            <div className="login-form-container">
                <form onSubmit={loginUser} className="login-form">
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