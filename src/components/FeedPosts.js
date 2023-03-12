import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Post from "./Post";

function FeedPosts(props) {

    let {userInfo} = useContext(AuthContext)

    if (userInfo) {
        return (
            <div className="feed-posts">
                {userInfo && (props.posts.length > 0) ? 
                    props.posts.slice(0).reverse().map((post, index) => {
                        if (userInfo.friends.includes(post.author) || userInfo.id === post.author){
                            let author = props.accounts.filter((user) => {return user.id===post.author})[0]
                            return <Post author={author} post={post} key={index}/>
                        } else {return null}
                    }) : null}
            </div>
        )
                }
}

export default FeedPosts;