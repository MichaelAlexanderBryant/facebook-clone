import { getPost } from "./getPost";

let putPostLike = async (authTokens, user, postId) => {
    
    let updateLikes = async (post) => {
      const uploadData = new FormData();
      uploadData.append('author', post.author);

      if (!post.liked_by.includes(user.user_id)) {
        uploadData.append('likes', post.likes + 1);
        post.liked_by.push(parseInt(user.user_id))
      } else {
        uploadData.append('likes', post.likes - 1);
        let index = post.liked_by.indexOf(parseInt(user.user_id));
        post.liked_by.splice(index,1)
      }

      for (let i = 0; i<post.liked_by.length; i++) {
        uploadData.append('liked_by', post.liked_by[i])
      }

      let response = await fetch(`http://127.0.0.1:8000/api/posts/${post.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: uploadData
      });

      if (response.status === 200) {
        return

      } else {
          alert("Something went wrong");
      };
    }

    let fetchPost = async () => {
      let post = await getPost(authTokens, postId);
      await updateLikes(post);
    } 

    await fetchPost();
  }

export {putPostLike};