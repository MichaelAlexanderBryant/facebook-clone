import UserCard from "./UserCard";

function FriendRequests(props) {

    return (
        <div>
            {(props.friendRequests && props.friendRequests.length > 0) ?
                <div>
                    <h1>Friend Requests</h1>
                    <div className="card-container">    
                        {
                            (props.friendRequests && props.friendRequests.length === 0) ?
                                    <p>No requests to display</p> : null
                        }
                        {props.accounts ? props.accounts.map((person, idx) => {
                                if (props.friendRequests && props.friendRequests.includes(person.id)) {
                                    return (
                                        <UserCard display="friends" person={person} key={idx} />
                                    )}
                        }):null}
                    </div>
                </div> : null }
        </div>
    )
}

export default FriendRequests;