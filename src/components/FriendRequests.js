import UserCard from "./UserCard";

function FriendRequests(props) {

    return (
        <div>
            {(props.incomingFriendRequests && props.incomingFriendRequests.length > 0) ?
                <div>
                    <h1>Friend Requests</h1>
                    <div className="card-container">    
                        {
                            (props.incomingFriendRequests && props.incomingFriendRequests.length === 0) ?
                                    <p>No requests to display</p> : null
                        }
                        {props.accounts ? props.accounts.map((person, idx) => {
                                if (props.incomingFriendRequests && props.incomingFriendRequests.includes(person.id)) {
                                    let requestIndex = props.incomingFriendRequests.indexOf(person.id)
                                    return (
                                        <UserCard display="friends"
                                                    person={person}
                                                    key={idx}
                                                    requestId={props.incomingFriendRequestsIds[requestIndex]}
                                                    incomingFriendRequests={props.incomingFriendRequests}
                                                    sentFriendRequests={[]}
                                                    userFriends={[]}
                                                    acceptRequestandDelete={props.acceptRequestandDelete}/>
                                    )}
                        }):null}
                    </div>
                </div> : null }
        </div>
    )
}

export default FriendRequests;