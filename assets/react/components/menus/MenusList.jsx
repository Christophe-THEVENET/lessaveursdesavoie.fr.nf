import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemMenus from './ItemMenus';

const MenusList = () => {
    // requête axios pour récupérer les menus
    const [mealsList, setMealsList] = useState([]);

    const [error, setError] = useState(null);

    const getMealsList = async () => {
        try {
            const response = await axios.get('https://lessaveursdesavoie.fr.nf/api/meals');
            setMealsList(response.data);
        } catch (error) {
            setError('Une erreur est survenue lors de la récupération des menus');
        }
    };

    useEffect(() => {
        getMealsList();
    }, []);

    return (
        <section className="menuList">
            {error && <p className="error-message">{error}</p>}
            {mealsList.map((menu, index) => (
                <ItemMenus key={menu.id} menu={menu} index={index} />
            ))}
        </section>
    );
};

export default MenusList;
