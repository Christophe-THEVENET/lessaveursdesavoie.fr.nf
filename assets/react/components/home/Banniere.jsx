import React from 'react';
import ReactPlayer from 'react-player';

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
            <h1 className="banniere__title">Les Saveurs De Savoie</h1>
            <h4 className="banniere__jingle">Cuisine traditionnelle des montagnes</h4>
        </section>
    );
};

export default Banniere;
