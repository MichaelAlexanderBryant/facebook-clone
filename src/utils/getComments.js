let getComments = async (authTokens, setComments, logoutUser, postId) => {
    let response = await fetch('http://127.0.0.1:8000/api/posts/comments/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access) 
        }
    })
    let data = await response.json()
    if (response.status === 200) {
        if (postId) {
            data = data.filter(comment => {
                return (parseInt(comment.post) === parseInt(postId))
        })}
        setComments(data);
    } else if (response.statusText === 'Unauthorized') {
        logoutUser();
    };
};

export {getComments};