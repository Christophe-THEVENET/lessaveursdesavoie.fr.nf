import React from 'react';
import { createRoot } from 'react-dom/client';
import Footer from '../components/Footer';
import BanniereMenus from '../components/menus/BanniereMenus';
import MenusList from '../components/menus/MenusList';
import Header from '../components/Header';

const Menus = () => {
    return (
        <>
            <Header />
            <main>
                <BanniereMenus />
                <MenusList />
            </main>
            <Footer />
        </>
    );
};

class MenusElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Menus />);
    }
}
customElements.define('menus-component', MenusElement);
