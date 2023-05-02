import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Banniere from '../components/home/Banniere';
import Restaurant from '../components/home/Restaurant';
import Favorite from '../components/home/Favorite';

const Home = () => {
    // requête axios pour récupérer la photo du plat du jour
    /* const [img, setImg] = useState(null);

    const getDishImage = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/favorite/dishes');
            setImg(response.data[0].imageName);
        } catch (error) {
            console.error(error);
        }
    }; */

    // formater la date
    /*  const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR', 'YYYY-MM-DD');
    }; */

    // requête axios pour récupérer une réservation
    /*    const [booking, setBooking] = useState(null);
    const [bookingDateFormated, setBookingDateFormated] = useState(null);

    const getBooking = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/bookings');
            setBooking(response.data[0]);
            setBookingDateFormated(formatDate(response.data[0].date));
        } catch (error) {
            console.error(error);
        }
    };

    console.log(booking);
    console.log(bookingDateFormated); */

    useEffect(() => {
      /*   getDishImage(); */
        /*  getBooking(); */
    }, []);

    return (
        <main>
            <Banniere url="../assets/video/banniere.mp4" /> 
             <Restaurant/> 
             <Favorite/>
        </main>
    );
};

class HomeElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Home />);
    }
}
customElements.define('home-component', HomeElement);
