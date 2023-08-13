import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../components/Perks.jsx";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader.jsx";

export default function PlacesPage() {
    const {action} = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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


    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}

            {action === 'new' && (
                <div>
                    <form>
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
            )}
        </div>
    )
}