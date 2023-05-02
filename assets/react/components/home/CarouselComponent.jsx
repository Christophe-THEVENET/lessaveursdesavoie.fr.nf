import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function CarouselComponent() {
    // requête axios pour récupérer les plats favoris
    const [favoriteDishes, setFavoriteDishes] = useState([]);

    const getFavoriteDishes = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/favorite/dishes');
            setFavoriteDishes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFavoriteDishes();
    }, []);




    return (
         <Carousel
         navButtonsAlwaysVisible={true}
       /*   NextIcon={<ArrowForwardIosIcon/>}
         PrevIcon={<ArrowBackIosIcon/>} */


         sx={{backgroundColor:'#d8b8ca'}}
         >
            {favoriteDishes.map((dish) => (
                <Item key={dish.id} dish={dish} />


            ))}
        </Carousel> 
    );
}

export default CarouselComponent;
