import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar"
import NavBar from "../components/NavBar"
import UserCard from "../components/UserCard";
import AuthContext from "../context/AuthContext";
import { getAccounts } from "../utils/getAccounts";



function AllUsers() {

    let [accounts, setAccounts] = useState(null);
    let {authTokens, logoutUser} = useContext(AuthContext);


    useEffect(() => {
        getAccounts(authTokens, setAccounts, logoutUser);
    },[])

    if (accounts) {
        return (
            <div>
                <NavBar/>
                <MiniSidebar/>
                <div className="allusers-container">
                        <div>
                            <h1>All Users</h1>
                            <div className="card-container">
                                {accounts ? accounts.map((person, idx) => {
                                    return <UserCard display="allusers" person={person} key={idx} />})
                                    :null}
                            </div>
                        </div>
                </div>
            </div>
        )
                            }
}

export default AllUsers;