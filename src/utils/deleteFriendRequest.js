let deleteFriendRequest = async (authTokens, friendRequestId, logoutUser) => {

    let response = await fetch(`http://127.0.0.1:8000/api/accounts/friend_requests/${friendRequestId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access) 
        }
    })

    if (response.status === 202) {
        return
    } else if (response.statusText === 'Unauthorized') {
        logoutUser();
    };
};

export {deleteFriendRequest};