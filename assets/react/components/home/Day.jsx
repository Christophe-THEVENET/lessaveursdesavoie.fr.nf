import React from 'react';

const Day = ({ openingHour }) => {
    // formater la date
    const formatDate = (date) => {
        const hours = new Date(date).getHours() - 1;
        const minute = new Date(date).getMinutes();

        return `${hours}:${minute}`;
    };

    return (
        <div key={openingHour.id} className="footer__horaire__block">
            
            {/* ------------- jour ------------- */}
            <div className="footer__horaire__block--day">
                <span className="footer__horaire__block--day-span">{openingHour.day}: </span>
            </div>
            {/* ------------- horaire midi ------------- */}
            <div className="footer__horaire__block--lunch">
                {formatDate(openingHour.lunch_start_hour) == '0:0' ? (
                    <span className="footer__horaire__block--lunch-start-span">fermé </span>
                ) : (
                    <span className="footer__horaire__block--lunch-start">
                        {formatDate(openingHour.lunch_start_hour)} -{' '}
                    </span>
                )}

                {formatDate(openingHour.lunch_end_hour) == '0:0' ? (
                    ''
                ) : (
                    <span>{formatDate(openingHour.lunch_end_hour)}0</span>
                )}
            </div>

            {/* ------------- horaire soir ------------- */}
            <div className="footer__horaire__block--dinner">
                {formatDate(openingHour.dinner_start_hour) == '0:0' ? (
                    'fermé'
                ) : (
                    <span>{formatDate(openingHour.dinner_start_hour)} - </span>
                )}
                {formatDate(openingHour.dinner_end_hour) == '0:0' ? (
                    ''
                ) : (
                    <span>{formatDate(openingHour.dinner_end_hour)}0</span>
                )}
            </div>
        </div>
    );
};

export default Day;
