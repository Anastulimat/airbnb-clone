import {useContext} from "react";
import {UserContext} from "../contexts/UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";

export default function AccountPage() {
    const {user, ready} = useContext(UserContext);

    /**
     * Get the value of the "subpage" parameter from the URL.
     * If the "subpage" parameter is undefined, set it to 'profile'.
     */
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'}/>
    }


    /**
     * Generates CSS classes for a link element based on the specified type.
     *
     * @param {string} type - The type of the link. Optional.
     *
     * @return {string} The generated CSS classes for the link.
     */
    function linkClasses(type = undefined) {
        let classes = 'p-2 px-6 text-center';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full'
        }
        return classes;
    }


    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <button className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}