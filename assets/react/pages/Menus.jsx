import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import BanniereMenus from '../components/menus/BanniereMenus';
import MenusMenus from '../components/menus/ItemMenus';
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
