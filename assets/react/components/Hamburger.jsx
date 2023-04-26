import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import '../../scss/styles.scss';

const Hamburger = () => {
    // ouverture et fermeture de la modale
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
        setIsHovered(!isHovered);
    };
    // hover sur le hamburger
    const [isHovered, setIsHovered] = useState(false);
    function handleMouseEnter() {
        setIsHovered(true);
    }
    function handleMouseLeave() {
        setIsHovered(false);
    }

    // élément twig qui passe les infos du user par data-attribute
    const userRating = document.querySelector('.js-user-rating');

    // élément twig qui passe les infos des roles du user par data-attribute
    const userAdmin = document.querySelector('.js-user-admin');

    // vérifie si l'utilisateur est connecté
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuth = () => {
        let user = JSON.parse(userRating.dataset.user);
        return user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    };

    // récupère l'utilisateur
    const [user, setUser] = useState({});
    const getUser = () => {
        setUser(JSON.parse(userRating.dataset.user));
    };

    // vérifie si l'utilisateur est admin
    const [admin, setAdmin] = useState([]);
    const checkAdmin = () => {
        let adminUser = JSON.parse(userAdmin.dataset.userAdmin);
        return adminUser ? setAdmin(adminUser) : setAdmin([]);
    };

    useEffect(() => {
        checkAuth();
        getUser();
        checkAdmin();
    }, []);

   

    return (
        <>
            {/*  bouton hamburger ouvrir menu ----------------------- */}
            <MenuOpenIcon
                onClick={toggleModal}
                style={
                    isHovered
                        ? {
                              color: '#dc8cba',
                              fontSize: '2rem',
                              cursor: 'pointer',
                              margin: '20px',
                              transform: 'scale(1.2)',
                              transition: 'all 0.3s ease-in-out',
                          }
                        : {
                              color: 'white',
                              fontSize: '2rem',
                              cursor: 'pointer',
                              margin: '20px',
                              transition: 'all 0.3s ease-in-out',
                          }
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {/*  ---------------------- modale----------------*/}
            {isOpen ? (
                <div className="menu">
                    <CloseIcon
                        className="hamburger-close"
                        onClick={toggleModal}
                        style={
                            isHovered
                                ? {
                                      color: '#dc8cba',
                                      position: 'absolute',
                                      top: '6px',
                                      left: '3px',
                                      fontSize: '2.5rem',
                                      cursor: 'pointer',
                                      margin: '20px',
                                      transform: 'scale(1.2)',
                                      transition: 'all 0.3s ease-in-out',
                                  }
                                : {
                                      position: 'absolute',
                                      top: '6px',
                                      left: '3px',
                                      color: 'white',
                                      fontSize: '2.5rem',
                                      cursor: 'pointer',
                                      margin: '20px',
                                      transition: 'all 0.3s ease-in-out',
                                  }
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <div className="menu-content">
                        <nav>
                            <ul>
                                <li onClick={toggleModal}>
                                    <a href="/">Acceuil</a>
                                </li>
                                <li onClick={toggleModal}>
                                    <a href="/menus">Menus</a>
                                </li>
                                <li onClick={toggleModal}>
                                    <a href="#">Carte</a>
                                </li>

                                {!isAuthenticated ? (
                                    <>
                                        <li onClick={toggleModal}>
                                            <a href="/login">Se connecter</a>
                                        </li>
                                        <li onClick={toggleModal}>
                                            <a href="/register">S'inscrire</a>
                                        </li>
                                    </>
                                ) : (
                                    <li onClick={toggleModal}>
                                        <a href="/logout">Se déconnecter {user.name} </a>
                                    </li>
                                )}

                                {admin.includes('ROLE_ADMIN') ? (
                                    <li onClick={toggleModal}>
                                        <a href="/admin">Administration</a>
                                    </li>
                                ) : null}
                            </ul>
                        </nav>
                    </div>
                </div>
            ) : (
                <div className="menu-close">
                    <CloseIcon
                        onClick={toggleModal}
                        style={
                            isHovered
                                ? {
                                      position: 'absolute',
                                      top: '6px',
                                      left: '3px',
                                      color: '#dc8cba',
                                      fontSize: '2rem',
                                      cursor: 'pointer',
                                      margin: '20px',
                                      transform: 'scale(1.2)',
                                      transition: 'all 0.3s ease-in-out',
                                  }
                                : {
                                      position: 'absolute',
                                      top: '6px',
                                      left: '3px',
                                      color: 'white',
                                      fontSize: '2rem',
                                      cursor: 'pointer',
                                      margin: '20px',
                                      transition: 'all 0.3s ease-in-out',
                                  }
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
            )}
        </>
    );
};

class HamburgerElement extends HTMLElement {
    connectedCallback() {
        const root = createRoot(this);
        root.render(<Hamburger />);
    }
}
customElements.define('hamburger-component', HamburgerElement);
