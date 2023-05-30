import React from 'react';
import ReactPlayer from 'react-player';
import logo from '../../../images/logo_new.png'

const Banniere = ({ url }) => {
    return (
        <section className="banniere">
            <ReactPlayer
                url={url}
                playing={true}
                loop={true}
                muted={true}
                className="banniere__video"
            />
            <img src={logo} alt="logo les saveurs de savoie restaurant" />
        </section>
    );
};

export default Banniere;
