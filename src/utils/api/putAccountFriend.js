import { getAccount } from "./getAccount";

let putAccountFriend = async (authTokens, toUserId, fromUserId) => {
    
    let updateFriends = async (profile) => {
      const uploadData = new FormData();
      uploadData.append('first_name', profile.first_name);
      uploadData.append('last_name', profile.last_name);
      uploadData.append('email', profile.email);

      if (!profile.friends.includes(fromUserId) && !profile.friends.includes(toUserId)) {
        if (profile.id === toUserId) {
            profile.friends.push(parseInt(fromUserId))
        } else {
            profile.friends.push(parseInt(toUserId))
        }}
      else {
        if (profile.id === toUserId) {
            let index = profile.friends.indexOf(parseInt(fromUserId));
            profile.friends.splice(index,1)
        } else {
            let index = profile.friends.indexOf(parseInt(toUserId));
            profile.friends.splice(index,1)
      }}

      for (let i = 0; i < profile.friends.length; i++) {
        uploadData.append('friends', profile.friends[i])
      }

      let response = await fetch(`http://127.0.0.1:8000/api/accounts/${profile.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: uploadData
      });

      if (response.status === 200) {
        return

      } else {
          alert("Something went wrong");
      };
    }

    let fetchAccounts = async () => {
      let toUser = await getAccount(authTokens, toUserId);
      await updateFriends(toUser);
      let fromUser = await getAccount(authTokens, fromUserId);
      await updateFriends(fromUser);
    } 

    await fetchAccounts();
  }

export {putAccountFriend};