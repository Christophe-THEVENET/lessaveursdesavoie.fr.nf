import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import '../../scss/styles.scss';

const Hamburger = () => {
    //
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
        setIsHovered(!isHovered);
    };

    const [isHovered, setIsHovered] = useState(false);
    function handleMouseEnter() {
        setIsHovered(true);
    }
    function handleMouseLeave() {
        setIsHovered(false);
    }

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
            {/*  modale ---------------------------------------------*/}

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
                                <li onClick={toggleModal}>
                                    <a href="#">Se connecter</a>
                                </li>
                                <li onClick={toggleModal}>
                                    <a href="#">S'inscrire</a>
                                </li>
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
