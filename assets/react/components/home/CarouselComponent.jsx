import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
function CarouselComponent() {
    // requête axios pour récupérer les plats favoris
    const [favoriteDishes, setFavoriteDishes] = useState([]);
    const [error, setError] = useState(null);

    const getFavoriteDishes = async () => {
        try {
            const response = await axios.get('https://lessaveursdesavoie.fr.nf/api/favorite/dishes');
            setFavoriteDishes(response.data);
        } catch (error) {
            setError('Une erreur est survenue lors de la récupération des plats favoris');
        }
    };

    useEffect(() => {
        getFavoriteDishes();
    }, []);

    return (
        <>
            {error && <p className="error-message">{error}</p>}
            <Carousel navButtonsAlwaysVisible={true}>
                {favoriteDishes.map((dish) => (
                    <Item key={dish.id} dish={dish} />
                ))}
            </Carousel>
        </>
    );
}

export default CarouselComponent;


