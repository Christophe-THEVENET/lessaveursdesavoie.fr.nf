import React from 'react';
import imgRestaurant from '../../images/restaurant.jpg';

const Restaurant = () => {
    return (
        <section className="restaurant">
            <div className="restaurant__name">
                <h2 className="restaurant__name__title">Restaurant</h2>
                <p className="restaurant__name__description">
                    Le restaurant est situé en Savoie, une région des Alpes françaises connue pour
                    sa beauté naturelle époustouflante et ses riches traditions culinaires. Le
                    restaurant est spécialisé dans la cuisine traditionnelle savoyarde, qui propose
                    des plats copieux préparés avec des ingrédients locaux tels que du fromage, des
                    pommes de terre et de la charcuterie.
                </p>
            </div>
            <div className="restaurant__image">
                <img src={imgRestaurant} alt="photo de table du restaurant" />
            </div>
        </section>
    );
};

export default Restaurant;
