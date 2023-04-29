import React from 'react';
import { createRoot } from 'react-dom/client';
import chantierImg from '../../images/chantier-construction.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    // requête axios pour récupérer les horaires d'ouverture
    const getData = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/dishes');
            setImg(response.data[0].imageName);
        } catch (error) {
            console.error(error);
        }
    };

    const [img, setImg] = useState('');

    useEffect(() => {
        getData();
    }, []);

    console.log(img);

    return (
        <main>
            <h1>Les Saveurs De Savoie</h1>
            <img src={chantierImg} alt="image chantier en construction" />
            <div className="construction">En construction ...</div>
            <img src={`../uploads/dishes/${img}`} />
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
