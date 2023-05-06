import React from 'react';
import { createRoot } from 'react-dom/client';


import BanniereMenus from '../components/menus/BanniereMenus';
import Footer from '../components/Footer';
import BanniereCarte from '../components/carte/BanniereCarte';
import CarteList from '../components/carte/CarteList';

const Carte = () => {
    return (
        <main>
            <BanniereCarte/>
            <CarteList/>
            <Footer/>
        </main>
    );
};

class CarteElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Carte />);
    }
}
customElements.define('carte-component', CarteElement);
