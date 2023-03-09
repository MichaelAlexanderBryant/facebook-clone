import NavBar from "../components/NavBar";

function Feed() {
    return (
      <div className="feed-container">
        <NavBar/>
        <div className="feed-center-panel">
          <div className="make-a-post-container">
            <form>
              <input type="text" name="post" placeholder="What's on your mind?"/>
              <button type="submit">Post</button>  
            </form>
          </div>
          <div className="feed-posts">

          </div>
        </div>
      </div>
    );
  }
  
  export default Feed;