import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ReactCalendar from 'react-calendar';
import axios from 'axios';
import { add, format } from 'date-fns';
import { fr } from 'date-fns/locale';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    maxWidth: 800,
    height: '80vh',
    bgcolor: '#523c48',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

export default function Booking() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [date, setDate] = useState({
        justDate: null,
        justTime: null,
    });

    const { justDate, justTime } = date;

    // requête axios pour récupérer les réservations du midi par date
    const [bookingLunchList, setBookingLunchList] = useState([]);
    const getbookingLunchList = async () => {
        try {
            const response = await axios.get(
                `https://127.0.0.1:8000/api/bookings/lunch/${justDate}`
            );
            setBookingLunchList(response.data);
        } catch (error) {
            console.error('pas de réservations de midi pour cette date');
        }
    };

    // requête axios pour récupérer les réservations du soir par date
    const [bookingDinnerList, setBookingDinnerList] = useState([]);
    const getbookingDinnerList = async () => {
        try {
            const response = await axios.get(
                `https://127.0.0.1:8000/api/bookings/dinner/${justDate}`
            );
            setBookingDinnerList(response.data);
        } catch (error) {
            console.error('pas de réservations du soir pour cette date');
        }
    };

    // requête axios pour récupérer la capacité du restaurant
    const [capacity, setCapacity] = useState(null);
    const getCapacity = async () => {
        try {
            const response = await axios.get(`https://127.0.0.1:8000/api/capacity`);
            setCapacity(response.data[0].service_capacity);
        } catch (error) {
            console.error('la requete a échouée');
        }
    };

    useEffect(() => {
        getbookingLunchList();
        getbookingDinnerList();
        getCapacity();
    }, [justDate]);

    // calcul du nombre de convives pour midi a la date selectionnée
    const nbLunchConvivesAtDate = bookingLunchList.reduce(
        (total, bookingLunch) => total + bookingLunch.nb_convives,
        0
    );

    // calcul du nombre de convives pour le soir a la date selectionnée
    const nbDinnerConvivesAtDate = bookingDinnerList.reduce(
        (total, bookingDinner) => total + bookingDinner.nb_convives,
        0
    );

    console.log(justDate);
    /*  console.log(bookingLunchList);
    console.log(bookingDinnerList);
    console.log('capacité', capacity);
    console.log('midi', nbLunchConvivesAtDate);
    console.log('soir', nbDinnerConvivesAtDate); */

    // ------------------ créneaux horaires -------------------

    // horaires du midi revoie un tableau d'horaires de midi
    const getTimesLunch = () => {
        if (!justDate) return;

        const beginningLunch = add(new Date(justDate.format()), { hours: 11, minutes: 30 });

        console.log('beginningLunch', beginningLunch);
        const endLunch = add(new Date(justDate), { hours: 15, minutes: 0 });
        const intervalLunch = 30;

        const timesLunch = [];
        for (let i = beginningLunch; i <= endLunch; i = add(i, { minutes: intervalLunch })) {
            timesLunch.push(i);
        }

        return timesLunch;
    };

    // horaires du soir renvoi un tableau d'horaires du soir
    const getTimesDinner = () => {
        if (!justDate) return;

        const beginningDinner = add(new Date(justDate), { hours: 18, minutes: 30 });
        const endDinner = add(new Date(justDate), { hours: 21, minutes: 0 });
        const intervalDinner = 30;

        const timesDinner = [];
        for (let i = beginningDinner; i <= endDinner; i = add(i, { minutes: intervalDinner })) {
            timesDinner.push(i);
        }

        return timesDinner;
    };

    const timesLunch = getTimesLunch();
    const timesDinner = getTimesDinner();

    console.log('timesLunch', timesLunch);
    console.log('timesDinner', timesDinner);

    return (
        <div>
            <button onClick={handleOpen} className="btn-booking">
                Réserver
            </button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <div className="booking__title__block">
                        <h2 className="booking__title__block--title">Réserver</h2>
                        <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="80pt"
                            viewBox="0 0 1280.000000 640.000000"
                        >
                            <g
                                transform="translate(0.000000,640.000000) scale(0.100000,-0.100000) "
                                fill="#b1849d"
                                stroke="none"
                            >
                                <path
                                    d="M6053 3465 c-106 -30 -226 -102 -376 -227 -32 -26 -62 -48 -66 -48
-5 0 -11 29 -13 64 -7 77 -38 140 -87 173 -64 44 -173 22 -212 -41 -24 -39
-24 -73 0 -109 31 -48 57 -60 112 -53 27 4 49 4 49 1 0 -3 -7 -19 -15 -34 -37
-73 -136 -111 -237 -92 -88 16 -165 50 -214 94 -41 38 -47 48 -51 93 -5 46 -3
53 22 72 37 29 89 29 110 0 8 -13 18 -40 22 -61 6 -43 15 -51 43 -42 16 5 20
15 20 56 0 57 -18 98 -56 128 -21 16 -41 21 -91 21 -58 0 -68 -3 -93 -29 -18
-18 -36 -52 -46 -90 -10 -33 -23 -61 -30 -61 -6 0 -73 31 -147 69 -236 119
-204 115 -882 115 -555 -1 -584 -2 -670 -22 -105 -25 -217 -63 -370 -125 -109
-45 -229 -76 -242 -63 -9 8 8 37 28 48 8 4 31 14 52 22 32 13 37 19 37 46 0
23 -6 33 -22 39 -49 18 -126 -26 -198 -113 -38 -47 -49 -54 -70 -49 -44 10
-111 42 -142 68 -16 14 -37 25 -47 25 -10 0 -38 -20 -64 -45 l-46 -46 -903 3
c-931 3 -1036 0 -1125 -38 -35 -14 -43 -38 -17 -48 9 -3 404 -6 878 -6 475 0
932 -3 1017 -6 l154 -7 36 -38 c20 -22 45 -39 55 -39 11 0 36 14 56 30 51 42
116 70 165 70 39 0 44 -4 74 -46 98 -143 329 -126 725 54 125 56 159 65 226
56 l48 -7 -22 -36 c-48 -76 -19 -202 52 -231 25 -11 38 -10 74 4 82 31 106
109 62 199 -14 30 -26 61 -26 70 0 23 84 83 144 103 72 24 181 15 276 -23 90
-37 100 -57 38 -73 -134 -34 -188 -80 -188 -160 0 -65 68 -130 135 -130 59 0
130 50 123 87 -4 19 -22 21 -110 8 -45 -7 -47 -6 -54 19 -8 35 21 84 66 107
66 36 150 22 363 -57 157 -59 385 -126 517 -154 343 -70 540 -13 855 250 192
160 268 195 405 187 149 -8 236 -67 141 -95 -52 -16 -84 -43 -130 -111 -55
-81 -104 -121 -146 -121 -38 0 -46 12 -33 55 19 66 -16 115 -80 115 -65 0
-102 -44 -102 -122 1 -100 80 -168 197 -168 66 0 162 26 220 60 l32 19 78 -35
c43 -18 88 -34 100 -34 12 0 52 15 88 34 l66 34 72 -31 c137 -58 291 -47 351
24 60 71 56 171 -7 209 -84 51 -157 -12 -130 -112 10 -38 10 -38 -19 -38 -42
0 -63 14 -150 96 -62 59 -119 102 -196 150 -2 2 -1 12 3 24 10 31 79 60 147
60 107 0 230 -63 456 -234 179 -135 217 -157 368 -211 87 -32 106 -35 203 -35
261 0 449 44 936 220 115 41 183 45 219 11 29 -28 35 -75 12 -107 -11 -15 -27
-19 -73 -19 -49 0 -58 -3 -61 -19 -6 -30 26 -46 87 -46 126 0 188 105 119 203
-25 35 -68 57 -138 72 l-55 11 50 32 c159 103 359 109 465 14 l43 -38 -37 -35
c-21 -19 -44 -46 -52 -61 -19 -37 -18 -104 3 -139 17 -29 67 -59 98 -59 24 0
67 25 95 55 23 25 25 34 24 116 -2 88 -1 89 22 89 38 0 142 -38 219 -79 120
-65 203 -92 335 -111 139 -20 291 22 364 99 42 43 80 41 165 -9 37 -22 80 -40
95 -40 15 0 56 18 92 39 51 31 80 41 132 47 37 4 489 5 1004 2 l938 -5 6 34
c4 19 3 37 -1 41 -4 4 -426 7 -938 7 -961 0 -1049 3 -1150 41 -80 30 -104 30
-148 -5 -53 -43 -105 -64 -134 -54 -13 4 -38 31 -57 58 -44 67 -91 90 -184 90
-75 0 -104 -13 -104 -46 0 -18 6 -19 70 -13 78 8 120 -4 145 -42 20 -32 19
-51 -5 -59 -36 -11 -165 14 -280 55 -338 121 -717 184 -1115 184 -359 1 -525
-30 -767 -145 -94 -44 -154 -67 -160 -61 -5 5 -13 34 -17 65 -4 30 -15 66 -23
79 -25 38 -83 61 -136 55 -55 -6 -91 -32 -116 -82 -22 -45 -13 -68 27 -73 22
-3 31 4 48 33 30 51 51 59 83 34 45 -36 52 -119 13 -170 -15 -20 -117 -86
-154 -100 -154 -58 -321 -5 -348 112 l-7 27 75 -2 c93 -1 117 15 117 80 0 50
-35 99 -87 120 -109 46 -210 -29 -228 -171 -4 -32 -11 -55 -18 -55 -14 0 -61
32 -172 115 -96 72 -198 120 -296 141 -94 19 -135 13 -237 -39 l-83 -42 -32
19 c-125 73 -219 91 -324 61z m-2423 -89 c0 -19 -12 -31 -54 -55 -59 -34 -95
-38 -190 -20 -90 16 -223 -18 -486 -127 -97 -40 -128 -48 -196 -52 -48 -3 -96
0 -117 7 -37 12 -64 37 -54 48 4 3 50 16 104 29 54 13 180 51 279 84 257 84
382 109 567 109 l147 1 0 -24z m740 8 c132 -25 242 -69 462 -185 278 -146 294
-153 396 -151 45 0 92 4 102 7 26 8 26 -11 0 -25 -11 -6 -56 -16 -100 -22
-181 -25 -364 24 -778 211 -111 50 -240 103 -285 117 -96 30 -109 36 -115 52
-6 18 218 15 318 -4z m4380 -3 c0 -12 -9 -22 -22 -27 -13 -3 -140 -58 -283
-121 -331 -147 -379 -166 -495 -196 -127 -34 -173 -40 -220 -32 -57 10 -50 29
19 55 33 12 90 40 128 62 155 91 386 198 508 235 84 26 185 41 278 42 80 1 87
-1 87 -18z m695 -1 c120 -15 293 -59 467 -120 79 -28 186 -57 238 -66 106 -18
138 -36 105 -60 -25 -19 -81 -34 -125 -34 -53 0 -126 21 -310 90 -182 68 -301
100 -373 100 -60 0 -107 19 -135 55 -32 40 -28 55 11 50 17 -3 73 -9 122 -15z
m1207 -147 c23 -21 23 -40 -2 -53 -24 -13 -70 -3 -70 16 0 14 34 54 47 54 3 0
15 -7 25 -17z m-8427 -17 c16 -12 17 -16 6 -30 -17 -20 -65 -21 -81 -1 -28 34
35 61 75 31z m7120 -37 c11 -33 -4 -88 -26 -100 -34 -18 -49 -4 -49 45 0 35 5
48 22 60 30 22 45 20 53 -5z m-5805 -30 c6 -10 10 -34 10 -53 0 -31 -3 -36
-24 -36 -22 0 -26 6 -32 45 -3 25 -4 51 0 60 7 18 33 9 46 -16z"
                                />
                            </g>
                        </svg>
                    </div>
                    {/* si une date a été sélectionnée, on affiche le choix de l'heure */}

                    {justDate ? (
                        <>
                            <h3>Choisissez votre horaire pour le {justDate}</h3>
                            {/*horaires du midi  */}
                            <div className="hours__block">
                                {/*  {timesLunch?.map((time) => (
                                    <div key={`time-${i}`} className="hours__block__hour">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDate((prev) => ({ ...prev, justTime: time }))
                                            }
                                        >
                                            {format(time, 'kk:mm')}
                                        </button>
                                    </div>
                                ))} */}
                            </div>

                            <div>
                                Il reste {capacity - nbLunchConvivesAtDate} places pour le midi
                            </div>

                            {/*horaires du soir */}
                            <div className="hours__block">
                                {/*  {timesDinner?.map((time) => (
                                    <div key={`time-${i}`} className="hours__block__hour">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDate((prev) => ({ ...prev, justTime: time }))
                                            }
                                        >
                                            {format(time, 'kk:mm')}
                                        </button>
                                    </div>
                                ))} */}
                            </div>

                            <div>
                                Il reste {capacity - nbDinnerConvivesAtDate} places pour le soir
                            </div>
                        </>
                    ) : (
                        <ReactCalendar
                            minDate={new Date()}
                            view="month"
                            onClickDay={(date) =>
                                setDate(() => ({
                                    justDate: date.toLocaleDateString('fr-FR').replace(/\//g, '-'),
                                }))
                            }
                        />
                    )}
                </Box>
            </Modal>
        </div>
    );
}
