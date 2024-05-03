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
            const response = await axios.get('http://127.0.0.1:8000/api/favorite/dishes');
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

/* SHA256:EyMAVy476cIU/v5wk5WhA8xyZ+g4Og6bEed5+O246gk  */
