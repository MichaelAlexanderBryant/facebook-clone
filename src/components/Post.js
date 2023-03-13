import defaultProfilePicture from "../assets/default-profile-picture.png";
import likeIcon from "../assets/like-icon.png";
import likedIcon from "../assets/liked-icon.svg";
import commentIcon from "../assets/comment-icon.png";
import { putLike } from "../utils/putLike";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";

function Post(props) {

    let {authTokens, user} = useContext(AuthContext);
    let [likes, setLikes] = useState(props.post.likes);
    const likeStatus = useRef(false);

    useEffect(() => {
        if (props.post.liked_by.includes(parseInt(user.user_id))) {
            likeStatus.current = true;
        }
    },[])
    
    async function submitLike() {

        if (!likeStatus.current) {
            setLikes(likes+1)
            likeStatus.current = true;
            putLike(authTokens, user, props.post)
        } else {
            setLikes(likes-1)
            likeStatus.current = false;
            putLike(authTokens, user, props.post)
        }
    }

    return (
        <div className="post">
            <div className="post-header">
                <a href={"/profile/" + props.author.id} className="post-header">
                    {props.author.profile_picture ? 
                    <img className="post-author-image" src={props.author.profile_picture} alt=""/>
                    : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
                    <p>{props.author.first_name} {props.author.last_name}</p>
                </a>
            </div>
            <p className="post-text">{props.post.body}</p>
            <img className="post-image" src={props.post.image} alt=""/>
            <div className="post-likes">
                <img src={likedIcon} alt="Liked" className="liked-icon"/>
                <span className="like-count">{likes}</span>
            </div>
            <div className="post-buttons">
                <div className="post-btn" onClick={submitLike}>
                    <img src={likeIcon} alt="Like post"/>
                    <span>Like</span>
                </div>
                <div className="post-btn">
                    <img src={commentIcon} alt="Like post"/>
                    <span>Comments</span>
                </div>
            </div>
      </div>
    )
}

export default Post;