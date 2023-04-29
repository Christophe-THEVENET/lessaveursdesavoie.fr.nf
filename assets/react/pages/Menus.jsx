import React from 'react';
import { createRoot } from 'react-dom/client';
import chantierImg from '../../images/chantier-construction.jpg';

const Menus = () => {
    return (
        <main>
            <h1>Les Saveurs De Savoie</h1>
            <h2 className="construction">Les menus</h2>
            <img src={chantierImg} alt="image chantier en construction" />
            <div className="construction">En construction ...</div>
        </main>
    );
};

class MenusElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Menus />);
    }
}
customElements.define('menus-component', MenusElement);
