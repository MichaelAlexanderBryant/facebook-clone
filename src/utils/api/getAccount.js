let getAccount = async (authTokens, accountId) => {

    let response = await fetch(`http://127.0.0.1:8000/api/accounts/${accountId}/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
    });
    let data = await response.json()

    if (response.status === 200) {
      return data

    } else {
        alert("Something went wrong");
    };  
  }

export {getAccount};