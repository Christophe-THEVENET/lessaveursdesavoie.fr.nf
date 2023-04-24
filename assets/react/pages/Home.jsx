import React from 'react';
import { createRoot } from 'react-dom/client';
import chantierImg from '../../img/chantier-construction.jpg';

const Home = () => {
    return (
        <main>
            <h1>Les Saveurs De Savoie</h1>
            <img src={chantierImg} alt="image chantier en construction" />
            <div className="construction">En construction ...</div>
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
