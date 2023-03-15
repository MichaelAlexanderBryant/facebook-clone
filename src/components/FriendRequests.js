import { useEffect, useState } from "react";
import UserCard from "./UserCard";

function FriendRequests(props) {

    let [friendRequests, setFriendRequests] = useState(null)
    let [requestId, setRequestId] = useState(null);

    useEffect(() => {
        if (props.friendRequests && props.friendRequests[0]) {
            setRequestId(props.friendRequests.map(elt => {return (elt.id)}))
            setFriendRequests(props.friendRequests.map(elt => {return elt.from_user}))
        }
    },[])

    return (
        <div>
            {(friendRequests && friendRequests.length > 0) ?
                <div>
                    <h1>Friend Requests</h1>
                    <div className="card-container">    
                        {
                            (friendRequests && friendRequests.length === 0) ?
                                    <p>No requests to display</p> : null
                        }
                        {props.accounts ? props.accounts.map((person, idx) => {
                                if (friendRequests && friendRequests.includes(person.id)) {
                                    let requestIndex = friendRequests.indexOf(person.id)
                                    return (
                                        <UserCard display="friends" person={person} key={idx} requestId={requestId[requestIndex]} deleteAndRerender={props.deleteAndRerender}/>
                                    )}
                        }):null}
                    </div>
                </div> : null }
        </div>
    )
}

export default FriendRequests;