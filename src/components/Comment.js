import { useContext, useEffect, useRef, useState } from "react";
import likedIcon from "../assets/liked-icon.svg";
import AuthContext from "../context/AuthContext";
import { calculateAge } from "../utils/calculateAge";
import { putCommentLike } from "../utils/api/putCommentLike";

function Comment(props) {

    let {authTokens, user} = useContext(AuthContext);
    let [likes, setLikes] = useState(props.comment.likes);
    let [likeIsDisabled, setLikeIsDisabled] = useState(false);
    const likedByUser = useRef(false);

    useEffect(() => {
        if (props.comment.liked_by.includes(parseInt(user.user_id))) {
            likedByUser.current = true;
        }
    },[])

    async function submitCommentLike() {
        if (!likedByUser.current) {
            setLikes(likes+1)
            likedByUser.current = true;
        } else {
            setLikes(likes-1)
            likedByUser.current = false;
        }
        await putCommentLike(authTokens, user, props.comment.id)
        setLikeIsDisabled(false);
    }

    let handleCommentLike = async () => {
        setLikeIsDisabled(true);
        await submitCommentLike();
    }

    return (
        <div className="comment">
            <div className="comment-text-link">
                <div className="comment-top">
                    <img className="post-comment-author-img"  src={props.postAuthor.profile_picture} alt=""/>
                    <div className="comment-text-area">
                        <span className="comment-author">{props.postAuthor.first_name + " " + props.postAuthor.last_name}</span>
                        <span className="comment-comment">{props.comment.comment}</span>
                    </div>
                </div>
                <div className="comment-like-age">
                    <span className="like-comment" onClick={likeIsDisabled? () => {} : handleCommentLike}>Like</span>
                    <span className="comment-age">{calculateAge(props.comment)}</span>
                    {likes > 0?
                    <span className="comment-like-count-container">
                        <img src={likedIcon} alt="Liked" className="liked-icon"/>
                        <span className="comment-like-count">{likes}</span>
                    </span>
                    : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment;
