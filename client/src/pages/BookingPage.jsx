import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceAddress from "../components/PlaceAddress.jsx";
import PlaceGallery from "../components/PlaceGallery.jsx";
import BookingDates from "../components/BookingDates.jsx";

export default function BookingPage() {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            })
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-2xl mr-48">{booking.place.title}</h1>
            <PlaceAddress className="my-2 block">{booking.place.address}</PlaceAddress>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex justify-between items-center">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking}/>
                </div>

                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>


            <PlaceGallery place={booking.place}></PlaceGallery>
        </div>
    );
}