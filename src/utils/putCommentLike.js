import { getComment } from "./getComment";

let putCommentLike = async (authTokens, user, commentId) => {
    
    let updateLikes = async (comment) => {
      const uploadData = new FormData();
      uploadData.append('author', comment.author);
      uploadData.append('post', comment.post)

      if (!comment.liked_by.includes(user.user_id)) {
        uploadData.append('likes', comment.likes + 1);
        comment.liked_by.push(parseInt(user.user_id))
      } else {
        uploadData.append('likes', comment.likes - 1);
        let index = comment.liked_by.indexOf(parseInt(user.user_id));
        comment.liked_by.splice(index,1)
      }

      for (let i = 0; i<comment.liked_by.length; i++) {
        uploadData.append('liked_by', comment.liked_by[i])
      }

      let response = await fetch(`http://127.0.0.1:8000/api/posts/comments/${comment.id}/`, {
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

    let fetchComment = async () => {
      let comment = await getComment(authTokens, commentId);
      await updateLikes(comment);
    } 

    await fetchComment();
  }

export {putCommentLike};