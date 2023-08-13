import PhotosUploader from "../components/PhotosUploader.jsx";
import Perks from "../components/Perks.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav.jsx";
import {Navigate, useParams} from "react-router-dom";

export default function PlacesFormPage() {

    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
        });
    }, [id]);

    function inputHeader(header = '') {
        return (
            <h2 className="text-2xl mt-4">{header}</h2>
        );
    }

    function inputDescription(description = '') {
        return (
            <p className="text-gray-500 text-sm">{description}</p>
        );
    }

    function preInput(header = '', description = '') {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function handleSavePlace(event) {
        event.preventDefault();

        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        }

        if (id) {
            // Update place
            await axios.put('/places', {id, ...placeData});
        } else {
            // New place
            await axios.post('/places', placeData);
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav/>

            <form onSubmit={handleSavePlace}>
                {preInput('Title', 'Title for your place. should be short and catchy')}
                <input type="text"
                       name="title"
                       id="title"
                       value={title}
                       onChange={event => setTitle(event.target.value)}
                       placeholder="Title, for example: My lovely appartement"/>

                {preInput('Address', 'Address to this place')}
                <input type="text"
                       name="address"
                       id="address"
                       value={address}
                       onChange={event => setAddress(event.target.value)}
                       placeholder="Address"/>

                {preInput('Photos', 'Show us how amazing your place is !')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>


                {preInput('Description', 'A good description of the place')}
                <textarea name="description"
                          id="description"
                          value={description}
                          onChange={event => setDescription(event.target.value)}
                          cols="10"
                          rows="5">
                        </textarea>

                {preInput('Perks', 'Select all the perks of your place')}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
                    <Perks selected={perks} onChange={setPerks}/>
                </div>

                {preInput('Extra info', 'House, rules, etc...')}
                <textarea name="extra-infp"
                          id="extra-info"
                          value={extraInfo}
                          onChange={event => setExtraInfo(event.target.value)}
                          cols="extra-info"
                          rows="5">
                        </textarea>

                {preInput('Check in & out times, max guests', 'Add check in and out times, remember to have some time for cleaning the room')}
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input type="text"
                               placeholder={"14"}
                               value={checkIn}
                               onChange={event => setCheckIn(event.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input type="text"
                               placeholder={"11"}
                               value={checkOut}
                               onChange={event => setCheckOut(event.target.value)}/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number"
                               placeholder={"1"}
                               min="1"
                               value={maxGuests}
                               onChange={event => setMaxGuests(parseInt(event.target.value))}/>
                    </div>
                </div>

                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
}