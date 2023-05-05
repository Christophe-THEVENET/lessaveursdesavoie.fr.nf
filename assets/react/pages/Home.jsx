import React from 'react';
import { createRoot } from 'react-dom/client';
import Banniere from '../components/home/Banniere';
import Restaurant from '../components/home/Restaurant';
import Favorite from '../components/home/Favorite';
import Chef from '../components/home/Chef';
import Producter from '../components/home/Producter';
import Maps from '../components/home/Maps';
import Footer from '../components/Footer';

const Home = () => {


    return (
        <main >
            <Banniere url="../assets/video/banniere.mp4" />
            <Restaurant />
            <Favorite />
            <Chef />
            <Producter />
            <Maps />
            <Footer />
        </main>
    );
};

class HomeElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Home />);
    }
}
customElements.define('home-component', HomeElement);
