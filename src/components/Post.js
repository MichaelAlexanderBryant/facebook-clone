import defaultProfilePicture from "../assets/default-profile-picture.png";

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
      </div>
    )
}

export default Post;