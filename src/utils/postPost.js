let postPost = async (e, authTokens, user, navigate) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('body', e.target.body.value);
    if (e.target.image.files.length > 0){
      uploadData.append('image', e.target.image.files[0], e.target.image.files[0].name);
    };
    uploadData.append('author', user.user_id)
    
    let response = await fetch('http://127.0.0.1:8000/api/posts/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: uploadData
    });

    if (response.status === 201) {
        navigate("/");
    } else {
        alert("Something went wrong");
    };  
  }

export {postPost};