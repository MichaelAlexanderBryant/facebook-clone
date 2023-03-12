import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ProfileFriends(props) {

    let {user} = useContext(AuthContext);

    if (user) {
        return (
            <div className="friends">
                <div className="friends-header"><span>Friends</span>
                    <a href={"/friends/" + user.user_id}><span>See all friends</span></a>
                </div>
                <div>{props.profile.friends ? (props.profile.friends.length === 1 ? props.profile.friends.length + " friend":
                        props.profile.friends.length + " friends"):null}</div>
            </div>
        )
    }
}

export default ProfileFriends;