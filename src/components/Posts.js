import FeedPosts from "./FeedPosts";
import ProfilePosts from "./ProfilePosts";

function Posts(props) {

    return (
        <div>
            {props.accounts? 
                <FeedPosts accounts={props.accounts} posts={props.posts} />
                :<ProfilePosts account={props.account} posts={props.posts} />}
        </div>
    )
}

export default Posts;