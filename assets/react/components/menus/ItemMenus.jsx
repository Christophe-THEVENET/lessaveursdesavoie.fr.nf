import React from 'react';
import imgChantier from '../../../images/chantier-construction.jpg';

const ItemMenus = () => {
    return (
        <article className="menusList__item__menus">
            <div className="menusList__item__menus--text">
                <h2>titre du menu</h2>
                <div>sdfsfsdfssdf</div>
                <div>sdfsfsdfssdf</div>
                <div>sdfsfsdfssdf</div>
                <div>sdfsfsdfssdf</div>
                <div>Prix: 24 €</div>
            </div>
            <div className="menusList__item__menus--image">
                <img src={imgChantier} alt="" />
            </div>
        </article>
    );
};

export default ItemMenus;
