import {useContext, useState} from "react";
import {UserContext} from "../contexts/UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../components/AccountNav.jsx";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(false);

    const {user, setUser, ready} = useContext(UserContext);

    /**
     * Get the value of the "subpage" parameter from the URL.
     * If the "subpage" parameter is undefined, set it to 'profile'.
     */
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect(true);
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }


    return (
        <div>
            <AccountNav/>

            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email}) <br/>
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
            
        </div>
    )
}