import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget.jsx";

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/places/' + id).then(response => {
            setPlace(response.data);
        });

    }, [id]);

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)}
                                className="fixed right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {place.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <img src={'http://localhost:4000/uploads/' + photo} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-2xl mr-48">{place.title}</h1>

            <a className="flex gap-1 font-semibold underline my-3"
               target='_blank'
               href={'https://maps.google.com/?q=' + place.address}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>

                {place.address}
            </a>

            <div className="relative">
                <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (<div>
                            <img onClick={() => setShowAllPhotos(true)}
                                 className="aspect-square object-cover cursor-pointer"
                                 src={'http://localhost:4000/uploads/' + place.photos[0]}
                                 alt=""/>
                        </div>)}
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)}
                                 className="aspect-square object-cover cursor-pointer"
                                 src={'http://localhost:4000/uploads/' + place.photos[1]} alt=""/>)}

                        <div className="overflow-hidden">
                            {place.photos?.[2] && (<img onClick={() => setShowAllPhotos(true)}
                                                        className="aspect-square object-cover cursor-pointer relative top-2"
                                                        src={'http://localhost:4000/uploads/' + place.photos[2]}
                                                        alt=""/>)}
                        </div>
                    </div>

                </div>
                <button onClick={() => setShowAllPhotos(true)}
                        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                    </svg>

                    Show more photos
                </button>
            </div>

            <div className="my-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>

                    Check in: {place.checkIn} <br/>
                    Check out: {place.checkOut} <br/>
                    Max number of guests: {place.maxGuests}
                </div>

                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>
        </div>)
}