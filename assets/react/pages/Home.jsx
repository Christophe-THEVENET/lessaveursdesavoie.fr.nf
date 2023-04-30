import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    // requête axios pour récupérer la photo du plat du jour
    const [img, setImg] = useState(null);

    const getDishImage = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/dishes');
            setImg(response.data[0].imageName);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDishImage();
    }, []);

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
