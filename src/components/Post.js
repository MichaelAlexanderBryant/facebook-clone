import defaultProfilePicture from "../assets/default-profile-picture.png";
import likeIcon from "../assets/like-icon.png";
import likedIcon from "../assets/liked-icon.svg";
import commentIcon from "../assets/comment-icon.png";
import { putLike } from "../utils/putLike";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { calculatePostAge } from "../utils/calculatePostAge";

function Post(props) {

    let {authTokens, user} = useContext(AuthContext);
    let [likes, setLikes] = useState(props.post.likes);
    const likedByUser = useRef(false);
    const [likeIsDisabled, setLikeIsDisabled] = useState(false);
    const [postAge, setPostAge] = useState(null);

    useEffect(() => {
        if (props.post.liked_by.includes(parseInt(user.user_id))) {
            likedByUser.current = true;
        }
        setPostAge(calculatePostAge(props.post));
    },[])


    async function submitLike() {
        
        if (!likedByUser.current) {
            setLikes(likes+1)
            likedByUser.current = true;
        } else {
            setLikes(likes-1)
            likedByUser.current = false;
        }

        await putLike(authTokens, user, props.post.id)
        setLikeIsDisabled(false);
        
    }

    let handleClick = async () => {
        setLikeIsDisabled(true);
        await submitLike();
    }

    if (postAge) {
        return (
            <div className="post">
                <div className="post-header">
                    <a href={"/profile/" + props.author.id} className="post-header">
                        {props.author.profile_picture ? 
                        <img className="post-author-image" src={props.author.profile_picture} alt=""/>
                        : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
                        <div>
                            <p className="post-author-name">{props.author.first_name} {props.author.last_name}</p>
                            <p className="post-age">{postAge}</p>
                        </div>
                    </a>
                </div>
                <p className="post-text">{props.post.body}</p>
                <img className="post-image" src={props.post.image} alt=""/>
                <div className="post-likes-comments">
                    <div className="post-likes">
                        <img src={likedIcon} alt="Liked" className="liked-icon"/>
                        <span className="like-count">{likes}</span>
                    </div>
                    <div className="post-comments">
                        <span className="comment-count">0 Comments</span>
                    </div>
                </div>
                <div className="post-buttons">
                    <div className="post-btn" onClick={likeIsDisabled? () => {} : handleClick}>
                        <img src={likeIcon} alt="Like post"/>
                        <span>Like</span>
                    </div>
                    <div className="post-btn">
                        <img src={commentIcon} alt="Like post"/>
                        <span>Comment</span>
                    </div>
                </div>
        </div>
        )
                    }
}

export default Post;