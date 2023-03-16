let postFriendRequest = async (authTokens, user, toUserId) => {

    const uploadData = new FormData();
    uploadData.append('from_user', user.user_id);
    uploadData.append('to_user', toUserId)
    
    let response = await fetch('http://127.0.0.1:8000/api/accounts/friend_requests/', {
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

export {postFriendRequest};