let getProfile = async (userId, authTokens, logoutUser) => {
    let response = await fetch(`http://127.0.0.1:8000/api/accounts/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access) 
        },
    });
    let data = await response.json()

    if (response.status === 200) {
        return data;
    } else if (response.statusText === 'Unauthorized') {
        logoutUser();
    };
};

export {getProfile};