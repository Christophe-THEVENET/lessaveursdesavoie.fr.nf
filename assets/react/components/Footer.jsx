import React, { useState, useEffect } from 'react';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from 'axios';

const Footer = () => {
    // requête axios pour récupérer les horaires d'ouverture
    const [OpeningHours, setOpeningHours] = useState([]);

    // formater la date
    const formatDate = (date) => {
        return new Date(date).getHours() + 'h' + new Date(date).getMinutes();
    };

    // requête axios pour récupérer les horaires d'ouverture
    const [openingHour, setOpeningHour] = useState(null);
    const [openingHourFormated, set0peningHourFormated] = useState(null);

    const getOpeningHour = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8000/api/opening-hours');
            setOpeningHour(response.data[1].lunch_start_hour);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOpeningHour();
    }, []);
   
    console.log(formatDate(openingHour));


    return (
        <footer>
            <div className="footer">
                <div className="footer__horaire">
                    <h2>Horaires</h2>
                    {OpeningHours.map((openingHour) => {
                        return (
                            <p key={openingHour.id}>
                                <span className="footer__horaire--day">{openingHour.day}: </span>
                                <span>{formatDate(openingHour.lunch_start_hour)}</span>-
                                <span>{openingHour.lunch_end_hour}</span>
                                <span className="footer__horaire--separation"></span>
                                <span>{openingHour.dinner_start_hour}</span>-
                                <span>{openingHour.dinner_end_hour}</span>
                            </p>
                        );
                    })}
                    <p>
                        <span className="footer__horaire--day">Lundi: </span>
                        <span>11h30</span>-<span>14h00</span>
                        <span className="footer__horaire--separation"></span>
                        <span>18h30</span>-<span>21h00</span>
                    </p>
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
                <a href="#">mentions légales</a>
            </div>
        </footer>
    );
};

export default Footer;
