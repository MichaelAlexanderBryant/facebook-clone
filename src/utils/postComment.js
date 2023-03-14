let postComment = async (e, authTokens, user, postId) => {
    const uploadData = new FormData();
    uploadData.append('comment', e.target[0].value);
    uploadData.append('author', user.user_id);
    uploadData.append('post', postId);

    
    let response = await fetch('http://127.0.0.1:8000/api/posts/comments/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: uploadData
    });

    if (response.status === 201) {
        return
    } else {
        alert("Something went wrong");
    };  
  }

export {postComment};