import { useContext} from "react";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function Posts(props) {
    let {user, userInfo} = useContext(AuthContext);
    console.log(props)
    return (
        <div className="feed-posts">
        {props.accounts.length > 0 && props.posts.length > 0 ? props.posts.slice(0).reverse().map((post, index) => {
            if (userInfo.friends && ((userInfo.friends.includes(post.author)) || (post.author === user.user_id))){
                  let postAuthor = props.accounts.filter((elt) => {
                    return elt.id === post.author
                  });                
                  return (
                    <div className="post" key={index}>
                      <div className="post-header">
                        <a href={"/profile/" + postAuthor[0].id} className="post-header">
                          {postAuthor[0].profile_picture ? 
                            <img className="post-author-image" src={postAuthor[0].profile_picture} alt=""/>
                            : <img className="post-author-image" src={defaultProfilePicture} alt=""/>}
                          <p>{postAuthor[0].first_name} {postAuthor[0].last_name}</p>
                        </a>
                      </div>
                      <p className="post-text">{post.body}</p>
                      <img className="post-image" src={post.image} alt=""/>
                    </div>
                  )
            } else {
              return null;
            }
            }):""}
      </div>
    )
}

export default Posts;