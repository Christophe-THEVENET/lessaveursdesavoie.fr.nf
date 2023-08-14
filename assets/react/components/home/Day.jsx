import React from 'react';
import { format, subHours } from 'date-fns';
import { fr } from 'date-fns/locale';

const Day = ({ openingHour }) => {
    // formate date avec date-fns
    const formatDate = (date) => {
        const hours = format(new Date(date), 'HH', { locale: fr });
        const minute = format(new Date(date), 'mm');

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
                {formatDate(openingHour.lunch_start_hour) == '00:00' ? (
                    <span className="footer__horaire__block--lunch-start-span">fermé </span>
                ) : (
                    <span className="footer__horaire__block--lunch-start">
                        {formatDate(openingHour.lunch_start_hour)} -{' '}
                    </span>
                )}

                {formatDate(openingHour.lunch_end_hour) == '00:00' ? (
                    ''
                ) : (
                    <span>{formatDate(openingHour.lunch_end_hour)}</span>
                )}
            </div>

            {/* ------------- horaire soir ------------- */}
            <div className="footer__horaire__block--dinner">
                {formatDate(openingHour.dinner_start_hour) == '00:00' ? (
                    'fermé'
                ) : (
                    <span>{formatDate(openingHour.dinner_start_hour)} - </span>
                )}
                {formatDate(openingHour.dinner_end_hour) == '00:00' ? (
                    ''
                ) : (
                    <span>{formatDate(openingHour.dinner_end_hour)}</span>
                )}
            </div>
        </div>
    );
};

export default Day;
