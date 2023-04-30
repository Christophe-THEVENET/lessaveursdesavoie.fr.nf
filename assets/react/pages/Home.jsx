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

    // élément twig qui passe les infos du user par data-attribute
    const userRating = document.querySelector('.js-user-rating');
    // récupère l'utilisateur
    const [currentUser, setCurrentUser] = useState({});
    const getCurrentUser = () => {
        setCurrentUser(JSON.parse(userRating.dataset.user));
    };

    useEffect(() => {
        getDishImage();
        getCurrentUser();
    }, []);

    return (
        <main>
            {currentUser ? (
                <div>
                    <p>Bienvenu {currentUser.name}</p>
                    <a href="logout">Se déconnecter</a>
                </div>
            ) : <div>
                <a href="login">Se connecter</a>
                </div>}

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
