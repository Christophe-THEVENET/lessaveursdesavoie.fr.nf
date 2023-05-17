import React, { useState, useEffect } from 'react';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from 'axios';
import Day from './home/Day';

const Footer = () => {
    // requête axios pour récupérer les horaires d'ouverture
    const [openingHoursList, setOpeningHoursList] = useState([]);
    const [error, setError] = useState('');

    const getOpeningHours = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/opening-hours');
            setOpeningHoursList(response.data);
        } catch (error) {
            setError('Une erreur est survenue lors de la récupération des horaires d\'ouverture')
        }
    };

    useEffect(() => {
        getOpeningHours();
    }, []);

    return (
        <footer>
            <div className="footer">
            {error && <p className='error-message'>{error}</p>}
                <div className="footer__horaire">
                    <h2>Horaires</h2>
                    {openingHoursList.map((openingHour) => {
                        return <Day openingHour={openingHour} key={openingHour.id} />;
                    })}
                </div>
                <div className="footer__contact">
                    <h2>Contact</h2>
                    <div className="footer__contact__block">
                        <div className="footer__contact__block__item">
                            <WhereToVoteIcon
                                sx={{ fontSize: 30 }}
                                className="footer__contact__block__item--icon"
                            />
                            <p>14 Rue des Gourmands, 74000 ANNECY</p>
                        </div>
                        <div className="footer__contact__block__item">
                            <LocalPhoneIcon
                                sx={{ fontSize: 30 }}
                                className="footer__contact__block__item--icon"
                            />
                            <p>04 34 91 45 28</p>
                        </div>
                        <div className="footer__contact__block__item">
                            <div>
                                <AlternateEmailIcon
                                    sx={{ fontSize: 30 }}
                                    className="footer__contact__block__item--icon"
                                />
                            </div>
                            <a href="mailto:lessaveursdesavoie@gmail.com">
                                lessaveursdesavoie@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer__reseaux">
                    <h2>Réseaux</h2>
                    <div className="footer__reseaux__item">
                        <a href="https://www.facebook.com/chezfrantz74" target="blank">
                            <FacebookIcon
                                sx={{ fontSize: 30, transition: 'all 0.5s ease-in-out' }}
                                className="footer__reseaux__item--icon"
                            />
                        </a>
                    </div>
                    <div className="footer__reseaux__item">
                        <a href="https://twitter.com/tasteofsavoie" target="blank">
                            <TwitterIcon
                                sx={{ fontSize: 30, transition: 'all 0.5s ease-in-out' }}
                                className="footer__reseaux__item--icon"
                            />
                        </a>
                    </div>
                    <div className="footer__reseaux__item">
                        <a href="https://www.instagram.com/annecybyfood/?hl=fr" target="blank">
                            <InstagramIcon
                                sx={{ fontSize: 30, transition: 'all 0.5s ease-in-out' }}
                                className="footer__reseaux__item--icon"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mentions">
                <a href="https://127.0.0.1:8000/mentions">mentions légales</a>
            </div>
        </footer>
    );
};

export default Footer;
