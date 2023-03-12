import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar"
import NavBar from "../components/NavBar"
import UserCard from "../components/UserCard";
import AuthContext from "../context/AuthContext";



function AllUsers() {

    let [accounts, setAccounts] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext);

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
                    <div>
                        <h1>All Users</h1>
                        <div className="card-container">
                            {accounts ? accounts.map((person, idx) => {
                                return <UserCard display="allusers" person={person} idx={idx} />})
                                :null}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AllUsers;