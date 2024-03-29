import defaultProfilePicture from "../assets/default-profile-picture.png";
import likeIcon from "../assets/like-icon.png";
import likedIcon from "../assets/liked-icon.svg";
import commentIcon from "../assets/comment-icon.png";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { calculateAge } from "../utils/calculateAge";
import { getComments } from "../utils/api/getComments";
import { getAccounts } from "../utils/api/getAccounts";
import { postComment } from "../utils/api/postComment";
import Comment from "./Comment";
import NewComment from "./NewComment";

function Post(props) {

    let {authTokens, user, logoutUser} = useContext(AuthContext);
    let [likes, setLikes] = useState(null);
    let [comments, setComments] = useState(null);
    let [accounts, setAccounts] = useState(null);
    const likedByUser = useRef(false);
    const [likeIsDisabled, setLikeIsDisabled] = useState(false);
    const [postAge, setPostAge] = useState(null);

    useEffect(() => {
        if (props.post.liked_by.includes(parseInt(user.user_id))) {
            likedByUser.current = true;
        }
        setPostAge(calculateAge(props.post));
        getComments(authTokens, setComments, logoutUser, props.post.id);
        getAccounts(authTokens, setAccounts, logoutUser);
        setLikes(props.post.likes)
    },[])


    async function showPostLike() {
        if (!likedByUser.current) {
            setLikes(likes+1)
            likedByUser.current = true;
        } else {
            setLikes(likes-1)
            likedByUser.current = false;
        }
    }

    let handleLike = async () => {
        setLikeIsDisabled(true);
        showPostLike();
        await props.handlePostLike(props.post.id);
        setLikeIsDisabled(false);
    }

    let [hideComments, setHideComments] = useState(true);

    let showComments = () => {
        if (!hideComments) {
            setHideComments(true);
        } else {
            setHideComments(false);
        }
    }

    let [reload, setReload] = useState(false)

    let submitComment = (e) => {
        e.preventDefault();
        postComment(e, authTokens, user, props.post.id);
        setComments([...comments])
        e.target.reset();
        setReload(true);
    }

    useEffect(() => {
        getComments(authTokens, setComments, logoutUser, props.post.id);
        setReload(false);
    },[reload])

    if (postAge && comments && accounts) {
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
                { props.post.body ?
                <p className="post-text">{props.post.body}</p>
                : null
                }
                {props.post.image ?
                <img className="post-image" src={props.post.image} alt=""/>
                : null
                }
                <div className="post-likes-comments">
                    {likes > 0 ?
                    <div className="post-likes">
                        <img src={likedIcon} alt="Liked" className="liked-icon"/>
                        <span className="like-count">{likes}</span>
                    </div>
                    : null
                    }
                    {comments.length > 0 ? 
                    <div className="post-comments-count">
                        <span className="comment-count" onClick={showComments}>
                            {comments.length} {comments.length === 1 ? "comment": "comments"}
                        </span>
                    </div>
                    : null
                    }
                </div>
                <div className="post-buttons">
                    <div className="post-btn" onClick={likeIsDisabled? () => {} : handleLike}>
                        <img src={likeIcon} alt="Like post"/>
                        <span>Like</span>
                    </div>
                    <div className="post-btn" onClick={showComments}>
                        <img src={commentIcon} alt="Like post"/>
                        <span>Comment</span>
                    </div>
                </div>
                <div className={hideComments? "post-comments-hide":"post-comments"}>
                    {comments.map((comment, index) => {
                        let postAuthor = accounts.filter(account => {return account.id === comment.author})[0]
                        return (
                            <Comment key={index} postAuthor={postAuthor} comment={comment}/>
                        )
                    })}
                    <NewComment submitComment={submitComment} />
                </div>
        </div>
        )
                    }
}

export default Post;