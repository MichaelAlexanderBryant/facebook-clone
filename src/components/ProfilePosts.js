import Post from "./Post";

function ProfilePosts(props) {
    return (
        <div className="feed-posts">
            {props.posts.length > 0 ? 
                props.posts.map((post, index) => {
                    return <Post author={props.account} post={post} key={index}/>
                }) : null}
        </div>
    )
}

export default ProfilePosts;