import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemMenus from './ItemMenus';

const MenusList = () => {
    // requête axios pour récupérer les plats favoris
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


    console.log(mealsList);




    return <section className="menuList">{/*   <ItemMenus /> */}</section>;
};

export default MenusList;
