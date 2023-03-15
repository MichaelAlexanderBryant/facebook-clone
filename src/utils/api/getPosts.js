let getPosts = async (authTokens, logoutUser, userId=null) => {
    let response = await fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access) 
        }
    })
    let data = await response.json()

    if (response.status === 200) {
        if (userId) {
            data = data.filter(post => {
                return (parseInt(post.author) === parseInt(userId))
        })}
        return data;
    } else if (response.statusText === 'Unauthorized') {
        logoutUser();
    };
};

export {getPosts};