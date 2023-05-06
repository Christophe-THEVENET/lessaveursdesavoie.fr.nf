import React from 'react';
import { createRoot } from 'react-dom/client';
import Footer from '../components/Footer';
import BanniereMenus from '../components/menus/BanniereMenus';
import MenusList from '../components/menus/MenusList';

const Menus = () => {
    return (
        <main>
            <BanniereMenus />
            <MenusList />
            <Footer />
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
