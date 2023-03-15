import FeedPosts from "./FeedPosts";
import ProfilePosts from "./ProfilePosts";

function Posts(props) {

    return (
        <div>
            {props.accounts? 
                <FeedPosts accounts={props.accounts} posts={props.posts} handlePostLike={props.handlePostLike}/>
                :<ProfilePosts account={props.account} posts={props.posts} handlePostLike={props.handlePostLike}/>}
        </div>
    )
}

export default Posts;