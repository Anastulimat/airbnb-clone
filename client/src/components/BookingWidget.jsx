import {useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {tr} from "date-fns/locale";
import {Navigate} from "react-router-dom";

export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');

    const [isLoading, setIsLoading] = useState(false); // State to track loading

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    useEffect(() => {
        // Simulate a loading delay when check-in or check-out changes
        if (checkIn || checkOut) {
            setIsLoading(true);
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 1000); // Adjust the delay time as needed
            return () => clearTimeout(timeout);
        }
    }, [checkIn, checkOut]);

    async function bookThisPlace() {
        const bookingData = {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            place: place._id,
            price: numberOfNights * place.price
        };

        const response = await axios.post('/bookings', bookingData);
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (<div className="bg-white p-4 rounded-2xl shadow">
        <div className="text-2xl text-center">
            Price: ${place.price} / per night
        </div>

        <div className="border rounded-2xl mt-4">
            <div className="flex">
                <div className="py-3 px-4 w-1/2">
                    <label htmlFor="">Check in:</label>
                    <input type="date"
                           name="checkIn"
                           id="checkIn"
                           value={checkIn}
                           onChange={event => setCheckIn(event.target.value)}
                    />
                </div>

                <div className="py-3 px-4 border-l w-1/2">
                    <label htmlFor="">Check out:</label>
                    <input type="date"
                           name="checkOut"
                           id="checkOut"
                           value={checkOut}
                           onChange={event => setCheckOut(event.target.value)}
                    />
                </div>
            </div>
            <div className="py-3 px-4 border-t">
                <label htmlFor="">Number of guests:</label>
                <input type="number"
                       name="numberOfGuests"
                       id="numberOfGuests"
                       value={numberOfGuests}
                       onChange={event => setNumberOfGuests(parseInt(event.target.value))}
                />
            </div>

            {numberOfNights > 0 && (
                <div className="py-3 px-4 border-t">
                    <label htmlFor="">Your full name:</label>
                    <input type="text"
                           name="name"
                           id="name"
                           value={name}
                           onChange={event => setName(event.target.value)}
                    />

                    <label htmlFor="">Phone number:</label>
                    <input type="tel"
                           name="mobile"
                           id="mobile"
                           value={phone}
                           onChange={event => setPhone(event.target.value)}
                    />
                </div>
            )}
        </div>

        <button onClick={bookThisPlace}
                className={`mt-2 primary relative ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary"></div>
                </div>
            )}
            Book this place
            &nbsp;
            {numberOfNights > 0 && (
                <span>${numberOfNights * place.price}</span>
            )}
        </button>
    </div>);
}