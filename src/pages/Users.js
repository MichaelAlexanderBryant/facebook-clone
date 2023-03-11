import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import defaultProfilePicture from "../assets/default-profile-picture.png";

function AllUsers(props) {

    console.log(props.display)

    let [accounts, setAccounts] = useState([]);
    let {authTokens, user, userInfo, logoutUser} = useContext(AuthContext);

    let getAccounts = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/accounts/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access) 
            }
        })
        let data = await response.json()
    
        if (response.status === 200) {
            setAccounts(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        };
    };

    useEffect(() => {
        getAccounts();
    },[])

    return (
        <div>
            <NavBar/>
            <MiniSidebar/>
            <div className="allusers-container">
                {props.display === "allusers" ? 
                    <div>
                    <h1>All Users</h1>
                    <div className="card-container">
                        {accounts ? accounts.map((person, idx) => {
                                return (
                                <div className="user-card" key={idx}>
                                    <div className="allusers-img-name">
                                        <div className="allusers-img-container">
                                            <a href={"/profile/" + person.id}>
                                                {person.profile_picture ?
                                                <img src={person.profile_picture} alt="" className="allusers-img"/>
                                                : <img src={defaultProfilePicture} alt="" className="allusers-img"/>
                                                }
                                            </a>
                                        </div>
                                        <a href={"/profile/" + person.id}>
                                            <p className="allusers-name">{person.first_name + " " + person.last_name}</p>
                                        </a>
                                    </div>
                                    {parseInt(person.id) !== parseInt(user.user_id) ?
                                        (userInfo.friends && userInfo.friends.includes(person.id) ?
                                        <button type="button" className="allusers-btn">Unfriend</button>
                                        : <button type="button" className="allusers-btn">Add Friend</button>)
                                        : null}
                                </div>
                            )
                        }):null}
                    </div></div>
                :
                    <div>
                    <h1>Friends</h1>
                    <div className="card-container">
                        {accounts ? accounts.map((person, idx) => {
                                if (userInfo.friends && userInfo.friends.includes(person.id)) {
                                return (
                                <div className="user-card" key={idx}>
                                    <div className="allusers-img-name">
                                        <div className="allusers-img-container">
                                            <a href={"/profile/" + person.id}>
                                                {person.profile_picture ?
                                                <img src={person.profile_picture} alt="" className="allusers-img"/>
                                                : <img src={defaultProfilePicture} alt="" className="allusers-img"/>
                                                }
                                            </a>
                                        </div>
                                        <a href={"/profile/" + person.id}>
                                            <p className="allusers-name">{person.first_name + " " + person.last_name}</p>
                                        </a>
                                    </div>
                                    {parseInt(person.id) !== parseInt(user.user_id) ?
                                        (userInfo.friends && userInfo.friends.includes(person.id) ?
                                        <button type="button" className="allusers-btn">Unfriend</button>
                                        : <button type="button" className="allusers-btn">Add Friend</button>)
                                        : null}
                                </div>
                            )} else return null;
                        }):null}
                    </div></div>
                    }
            </div> 
        </div>
    )
}

export default AllUsers;