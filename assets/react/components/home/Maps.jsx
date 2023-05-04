import React from 'react';

const Maps = () => {
    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44429.79905633268!2d6.076246844764455!3d45.89406422375786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8ffa1c0551c9%3A0x42781681620534ba!2sAnnecy!5e0!3m2!1sfr!2sfr!4v1683025622871!5m2!1sfr!2sfr"
                style={{
                    width: '100%',
                    height: '100%',
                    style: 'border:0',
                    allowfullscreen: 'true',
                    loading: 'lazy',
                    referrerpolicy: 'no-referrer-when-downgrade',
                }}
            ></iframe>
        </div>
    );
};

export default Maps;
