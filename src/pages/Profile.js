import { useContext, useEffect, useState } from "react";
import MiniSidebar from "../components/MiniSidebar";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";

function Profile() {

    let currentUrl = window.location.href
    let userId = currentUrl.slice(currentUrl.indexOf("profile/")+8)

    let [profile, setProfile] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext);

    let getProfile = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/accounts/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access) 
            },
        });
        let data = await response.json()

        if (response.status === 200) {
            setProfile(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        };
    }

    useEffect(() => {
        getProfile();
    }, []) 

    return (
        <div>
            <NavBar/>
            <MiniSidebar/>
        </div>
    )
}

export default Profile;