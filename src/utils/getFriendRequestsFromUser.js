let getFriendRequestsFromUser = async (authTokens, user, setFriendRequests, logoutUser) => {
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
            return (parseInt(elt.from_user) === parseInt(user.user_id))
        })
        data = data.map(elt => {
            return (elt.to_user)
        })
        await setFriendRequests(data);
    } else if (response.statusText === 'Unauthorized') {
        logoutUser();
    };
};

export {getFriendRequestsFromUser};