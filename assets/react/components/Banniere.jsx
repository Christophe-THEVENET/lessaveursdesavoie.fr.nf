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
            <h1>Les Saveurs De Savoie</h1>
            <h4>Cuisine traditionnelle des montagnes</h4>
        </section>
    );
};

export default Banniere;
