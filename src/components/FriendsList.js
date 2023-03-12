import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserCard from "./UserCard";

function FriendsList(props) {

    let {userInfo} = useContext(AuthContext);

    if (userInfo) {
        return (
            <div>
                <h1>Friends</h1>
                <div className="card-container">
                    {   
                        (userInfo.friends && userInfo.friends.length === 0) ?
                                <p>No friends to display</p> : null
                    }
                        
                    {props.accounts ? props.accounts.map((person, idx) => {
                            if (userInfo.friends && userInfo.friends.includes(person.id)) {
                            return (
                                <UserCard friendsList={true} person={person} key={idx} />
                        )} else return null;
                    }):null}
                </div>
            </div>
        )
            }
}

export default FriendsList;