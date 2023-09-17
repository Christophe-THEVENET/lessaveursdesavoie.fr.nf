import React from 'react';
import { createRoot } from 'react-dom/client';
import Footer from '../components/Footer';
import BanniereCarte from '../components/carte/BanniereCarte';
import CarteList from '../components/carte/CarteList';
import Header from '../components/Header';

const Carte = () => {
    return (
        <>
            <Header />
            <main>
                <BanniereCarte />
                <CarteList />
            </main>
            <Footer />
        </>
    );
};

class CarteElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Carte />);
    }
}
customElements.define('carte-component', CarteElement);
