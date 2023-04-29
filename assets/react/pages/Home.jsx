import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const getData = async () => {
        try {
            const response = await axios.get('https://lessaveursdesavoie.fr.nf/api/dishes');
            setImg(response.data[0].imageName);
        } catch (error) {
            console.error(error);
        }
    };

    const [img, setImg] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    console.log(img);

    return (
        <main>
            <h1>Les Saveurs De Savoie</h1>
            <div className="construction">En construction ...</div>
            {img ? <img src={`../uploads/dishes/${img}`} /> : null}
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
