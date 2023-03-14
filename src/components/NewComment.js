import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function NewComment(props) {

    let {userInfo} =useContext(AuthContext)

    return (
        <form id="comment-form" onSubmit={props.submitComment}>
            <div className="user-post-comment">
                {userInfo.profile_picture ? 
                                <img className="user-post-comment-img" src={userInfo.profile_picture} alt=""/>
                                : <img className="user-post-comment-img" src={defaultProfilePicture} alt=""/>}
                <input className="user-text-input comment-input" type="text" name="body" placeholder="Write a comment..."/>
            </div>
            <div className="comment-button-container">
                <button className="comment-button" type="submit">Post</button>
            </div>  
        </form> 
    )
}

export default NewComment;