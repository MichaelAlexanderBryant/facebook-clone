import defaultProfilePicture from "../assets/default-profile-picture.png";
import likeIcon from "../assets/like-icon.png";
import likedIcon from "../assets/liked-icon.svg";
import commentIcon from "../assets/comment-icon.png";

function Post(props) {
    
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
                <span className="like-count">{props.post.likes}</span>
            </div>
            <div className="post-buttons">
                <div className="post-btn">
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