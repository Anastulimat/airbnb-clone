import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import Perks from "../components/Perks.jsx";
import axios from "axios";

export default function PlacesPage() {
    const {action} = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
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

    async function addPhotoByLink(event) {
        event.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink});
        setAddedPhotos(prevState => {
            return [...prevState, filename];
        });
        setPhotoLink('');
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
                        <div className="flex gap-2">
                            <input type="text"
                                   value={photoLink}
                                   onChange={event => setPhotoLink(event.target.value)}
                                   placeholder={'Add using a link ... jpg'}/>
                            <button className="bg-gray-200 px-4 rounded-2xl"
                                    onClick={addPhotoByLink}>
                                Add&nbsp;photo
                            </button>
                        </div>

                        {/* Upload photos from device part */}
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                <div>
                                    <img src={'http://localhost:4000/uploads/' + link}
                                         alt={link}
                                         key={index}
                                         className="rounded-2xl"
                                    />
                                </div>
                            ))}

                            <button
                                className="flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                                </svg>
                                Upload
                            </button>
                        </div>

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