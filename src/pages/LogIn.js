import facebookLogo from "../assets/login-logo.svg"

function LogIn() {
    return (
      <div>
        <div className="left-panel">
            <img src={facebookLogo} alt="Facebook Logo"/>
            <h1>Connect with friends and the world around you on Facebook.</h1>
        </div>
        <div className="right-panel">
            <div className="LogIn-container">
                <form>
                    <input type="text" placeholder="Email"/>
                    <input type="text" placeholder="Password"/>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
  
  export default LogIn;