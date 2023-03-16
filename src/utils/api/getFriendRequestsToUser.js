let getFriendRequestsToUser = async (authTokens, user, logoutUser) => {
    let response = await fetch('http://127.0.0.1:8000/api/accounts/friend_requests/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access) 
        }
    })
    let data = await response.json()

    if (response.status === 200) {
        data = data.filter(elt => {
            return (parseInt(elt.to_user) === parseInt(user.user_id))
        })
        return data;
    } else if (response.statusText === 'Unauthorized') {
        logoutUser();
    };
};

export {getFriendRequestsToUser};