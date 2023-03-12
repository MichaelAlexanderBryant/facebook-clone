import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function NewPost(props) {

    let {userInfo} = useContext(AuthContext);

    
    return (
        <div className="make-a-post-container">
            <form onSubmit={props.submitPost}>
            <div className="user-text-post">
            {userInfo.profile_picture ? 
                            <img className="post-author-image" src={userInfo.profile_picture} alt=""/>
                            : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
            <input className="user-text-input" type="text" name="body" placeholder={"What's on your mind, " + userInfo.first_name + "?"}/>
            </div>
            <input className="image-input" type="file" accept="image/png, image/jpeg" name="image"/>
            <button className="post-button" type="submit">Post</button>  
            </form>
        </div>
    )
}

export default NewPost;