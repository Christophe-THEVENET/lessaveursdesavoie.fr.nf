import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemMenus from './ItemMenus';

const MenusList = () => {
    // requête axios pour récupérer les menus
    const [mealsList, setMealsList] = useState([]);

    const getMealsList = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/meals');
            setMealsList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMealsList();
    }, []);

    return (
        <section className="menuList">
            {mealsList.map((menu, index) => (
                <ItemMenus key={menu.id} menu={menu} index={index} />
            ))}
        </section>
    );
};

export default MenusList;
