import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ReactCalendar from 'react-calendar';
import axios from 'axios';
import { add, format, subHours } from 'date-fns';
import { fr } from 'date-fns/locale';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { parse, isWithinInterval } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';

// style de la modale de réservation
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    maxWidth: 800,
    minHeight: '80vh',
    bgcolor: '#523c48',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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

    const [isLoading, setIsLoading] = useState(true);

    // requête réservations du midi par date
    const [errorLunch, setErrorLunch] = useState(false);
    const [bookingLunchList, setBookingLunchList] = useState([]);
    const getbookingLunchList = async () => {
        try {
            const response = await axios.get(
                `https://lessaveursdesavoie.fr.nf/api/bookings/lunch/${format(justDate, 'yyyy-MM-dd')}`
            );
            setBookingLunchList(response.data);
            setIsLoading(false);
        } catch (error) {
            setErrorLunch(
                'une erreur est survenue lors de la récupération des réservations. Veuillez réeessayer ultérieurement'
            );
        }
    };

    // requête réservations du soir par date
    const [errorDinner, setErrorDinner] = useState(false);
    const [bookingDinnerList, setBookingDinnerList] = useState([]);
    const getbookingDinnerList = async () => {
        try {
            const response = await axios.get(
                `https://lessaveursdesavoie.fr.nf/api/bookings/dinner/${format(justDate, 'yyyy-MM-dd')}`
            );
            setBookingDinnerList(response.data);
            setIsLoading(false);
        } catch (error) {
            setErrorDinner(
                'une erreur est survenue lors de la récupération des réservations. Veuillez réeessayer ultérieurement'
            );
        }
    };

    // requête capacité du restaurant
    const [capacity, setCapacity] = useState(null);
    const [errorCapacity, setErrorCapacity] = useState(false);
    const getCapacity = async () => {
        try {
            const response = await axios.get(`https://lessaveursdesavoie.fr.nf/api/capacity`);
            setCapacity(response.data[0].service_capacity);
        } catch (error) {
            setErrorCapacity(
                'une erreur est survenue lors de la récupération de la capacité du restaurant. Veuillez réeessayer ultérieurement'
            );
        }
    };

    // requête user connecté
    const [user, setUser] = useState({});
    const [errorUser, setErrorUser] = useState(false);
    const getUser = async () => {
        try {
            const response = await axios.get(`https://lessaveursdesavoie.fr.nf/api/user`);
            setUser(response.data);
            setEmail(response.data.email);
            setNbConvives(response.data.nb_convives);
            response.data.allergy && setAllergy(response.data.allergy);
        } catch (error) {
            setErrorUser(
                "une erreur est survenue lors de la récupération de l'utilisatteur. Veuillez réeessayer ultérieurement"
            );
        }
    };

    // lance les reqûetes quand la date est selectionnée
    useEffect(() => {
        justDate && getbookingLunchList();
        justDate && getbookingDinnerList();
        justDate && getCapacity();
        justDate && getUser();
    }, [justDate]);

    // si il y a un user il faut le valider son email
    useEffect(() => {
        email && validateEmail();
    }, [justTime]);

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

    // --------------------------- créneaux horaires ----------------------------------------

    // renvoi tableau d'horaires de midi
    const getTimesLunch = () => {
        if (!justDate) return;
        // fixe 11:30 a la date donnée
        const beginningLunch = add(new Date(justDate), { hours: 11, minutes: 30 });
        // fixe 14:30 a la date donnée
        const endLunch = add(new Date(justDate), { hours: 14, minutes: 30 });
        const intervalLunch = 15;
        const timesLunch = [];
        for (
            let i = beginningLunch;
            //  fin du service 1 heure avant
            i <= subHours(endLunch, 1);
            i = add(i, { minutes: intervalLunch })
        ) {
            timesLunch.push(i);
        }

        // retourne tableau de date de 11h30 a 13h30 toutes les 15min
        return timesLunch;
    };

    // renvoi un tableau d'horaires du soir
    const getTimesDinner = () => {
        if (!justDate) return;
        const beginningDinner = add(new Date(justDate), { hours: 18, minutes: 30 });
        const endDinner = add(new Date(justDate), { hours: 21, minutes: 0 });
        const intervalDinner = 15;
        const timesDinner = [];
        for (
            let i = beginningDinner;
            i <= subHours(endDinner, 1);
            i = add(i, { minutes: intervalDinner })
        ) {
            timesDinner.push(i);
        }
        return timesDinner;
    };

    // tableau d'horaires de midi
    const timesLunch = getTimesLunch();
    // tableau d'horaires du soir
    const timesDinner = getTimesDinner();

    // vérifie si l'heure selectionnée est dans l'intervalle
    const checkTimeWithinInterval = (time, start, end) => {
        const formatedTime = format(time, 'HH:mm');
        const timeToCheck = parse(formatedTime, 'HH:mm', new Date(), { locale: fr });

        const interval = {
            start: parse(start, 'HH:mm', new Date(), { locale: fr }),
            end: parse(end, 'HH:mm', new Date(), { locale: fr }),
        };

        return isWithinInterval(timeToCheck, interval);
    };

    // ----------------------- composant select nombre de convives --------------------------------------
    const [nbConvives, setNbConvives] = useState('');
    // select nombre de convives
    const SelectNumber = () => {
        const handleChange = (event) => {
            setNbConvives(event.target.value);
        };
        // nombre de personnes possible en fonction des places restantes
        const arrayNumbers = [];
        for (
            let i = 1;
            i <=
            // si date sélect est dans l'interval alors nb dispo repas du midi sinon repas du soir
            (checkTimeWithinInterval(justTime, '11:00', '16:00')
                ? capacity - nbLunchConvivesAtDate
                : capacity - nbDinnerConvivesAtDate);
            i++
        ) {
            arrayNumbers.push({ i });
        }

        return (
            <Box sx={{ minWidth: 120, backgroundColor: '#b1849d' }}>
                <FormControl fullWidth sx={{ backgroundColor: '#b1849d' }}>
                    <InputLabel id="demo-simple-select-label">Nombre de personnes</InputLabel>
                    <Select
                        sx={{ backgroundColor: '#b1849d', transition: 'all 0.2s ease-in-out' }}
                        className="select-nb-convives"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={nbConvives}
                        label="nbConvives"
                        onChange={handleChange}
                    >
                        {arrayNumbers.map((number) => (
                            <MenuItem
                                key={number.i}
                                value={number.i}
                                sx={{
                                    backgroundColor: '#b1849d',
                                    color: '#0e0008',
                                    fontSize: '1.2rem',
                                    padding: '0.4rem',
                                    transition: '0.4s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: '#ff679a',
                                        color: '#ffffff',
                                        transform: 'translateX(10px)',
                                    },
                                }}
                            >
                                {number.i} personne{number.i < 2 ? null : 's'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        );
    };

    //  ---------------------validation email et allergies -------------------------------

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [validationEmail, setValidationEmail] = useState(false);
    const validateEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{1,63}$/;

        {
            email && setErrorEmail(!emailRegex.test(email));
        }

        {
            email && !errorEmail && setValidationEmail(true);
        }
    };

    const [allergy, setAllergy] = useState('');
    const [errorAllergy, setErrorAllergy] = useState(false);

    const validateAllergy = () => {
        const allergyRegex = /^[a-zA-Z0-9\s\.,!?']+$/g;

        {
            allergy && setErrorAllergy(!allergyRegex.test(allergy));
        }
    };

    //---------------------  soummission de la reservation --------------------------------

    // requête post pour ajouter une réservation
    const addBooking = async () => {
        const reservationData = {
            date: format(justDate, 'yyyy-MM-dd'),
            hour: format(justTime, 'kk:mm'),
            email: email,
            nb_convives: nbConvives,
            allergy: allergy,
        };

        try {
            const response = await axios.post(
                'https://lessaveursdesavoie.fr.nf/api/booking',
                reservationData
            );
            if (response.status === 200) {
                handleClose();
                toast.success(
                    `Votre réservation du ${format(justDate, 'dd-MM')} à ${format(
                        justTime,
                        'kk:mm'
                    )}  a bien été prise en compte`
                );
                // reset de la réservation
                setNbConvives('');
                setEmail('');
                setAllergy('');
                setDate({ justDate: null, justTime: null });
                setValidationEmail(false);
            }
        } catch (error) {
            toast.error(
                'Un probleme est survenu lors de la réservation. Veuillez réessayer plus tard'
            );
        }
    };

    // déclenche la requête post réservation au click bouton
    const handleSubmit = (event) => {
        event.preventDefault();
        addBooking();
    };

    return (
        // ---------------- bouton réserver -----------------
        <div>
            <button onClick={handleOpen} className="btn-booking">
                Réserver
            </button>
            {/* ---------------- modale réservation ----------------- */}
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
                        // si une heure a été sélectionnée, on affiche la validationEmail de la réservation
                        justTime ? (
                            // ------------------------- block valider la réservation -----------------------------
                            <div className="booking__hours">
                                <h3>
                                    {format(justDate, 'EEEE d MMMM yyyy', { locale: fr })} à{' '}
                                    {format(justTime, 'kk:mm', { locale: fr })}
                                </h3>
                                <div className="booking__hours__block valid-block">
                                    <div className="booking__hours__block__demi">
                                        <SelectNumber capacity={capacity} />
                                    </div>
                                </div>
                                <div className="booking__hours__block valid-block">
                                    <div className="booking__hours__block__demi">
                                        {nbConvives && (
                                            <TextField
                                                id="email"
                                                label="Email"
                                                variant="outlined"
                                                value={email}
                                                onKeyUp={validateEmail}
                                                onChange={(e) => setEmail(e.target.value)}
                                                error={errorEmail}
                                                helperText={errorEmail ? 'Email invalide' : ''}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="booking__hours__block valid-block">
                                    <div className="booking__hours__block__demi">
                                        {nbConvives && (
                                            <TextField
                                                id="allergy"
                                                label="Préciser si des personnes ont des allergies"
                                                variant="outlined"
                                                value={allergy}
                                                error={errorAllergy}
                                                onKeyUp={validateAllergy}
                                                onChange={(e) => setAllergy(e.target.value)}
                                                helperText={
                                                    errorAllergy
                                                        ? 'Attention charactères non autorisés ou trop long'
                                                        : ''
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                {validationEmail && !errorEmail && !errorAllergy && email ? (
                                    <Button
                                        type="submit"
                                        className="btn-valid_booking"
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Réserver
                                    </Button>
                                ) : (
                                    <Button
                                        className="btn-valid_booking"
                                        variant="contained"
                                        disabled
                                    >
                                        Réserver
                                    </Button>
                                )}
                            </div>
                        ) : (
                            // ------------------------- block horaires -----------------------------

                            <div className="booking__hours">
                                <h3>{format(justDate, 'EEEE d MMMM yyyy', { locale: fr })}</h3>
                                {/* ---------------horaires du midi ---------------  */}
                                <div className="booking__hours__block">
                                    <h5>Repas du midi</h5>
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        <>
                                            {errorLunch && (
                                                <p className="error-message">{errorLunch}</p>
                                            )}

                                            <div className="booking__hours__block__demi">
                                                {timesLunch?.map((time, i) => (
                                                    <div
                                                        key={`time-${i}`}
                                                        className="booking__hours__block__demi__hour"
                                                    >
                                                        <button
                                                            type="button"
                                                            // au click selectionne heure
                                                            onClick={() => {
                                                                setDate((prev) => ({
                                                                    ...prev,
                                                                    justTime: time,
                                                                }));
                                                            }}
                                                            // style des boutons horaires en fonction de la capacité
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                color:
                                                                    capacity <=
                                                                    nbLunchConvivesAtDate
                                                                        ? '#3d1111da'
                                                                        : '#fff',
                                                            }}
                                                            disabled={
                                                                capacity <= nbLunchConvivesAtDate
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            {format(time, 'kk:mm')}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            {!errorLunch && (
                                                <div
                                                    className={
                                                        capacity <= nbLunchConvivesAtDate
                                                            ? `complet`
                                                            : `places`
                                                    }
                                                >
                                                    {capacity <= nbLunchConvivesAtDate
                                                        ? `Complet`
                                                        : `Il reste ${
                                                              capacity - nbLunchConvivesAtDate
                                                          } places`}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                {/* ------------------- horaires du soir ----------------- */}
                                <div className="booking__hours__block">
                                    <h5>Repas du soir</h5>
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        <>
                                            {errorDinner && (
                                                <p className="error-message">{errorDinner}</p>
                                            )}
                                            <div className="booking__hours__block__demi">
                                                {timesDinner?.map((time, i) => (
                                                    <div
                                                        key={`time-${i}`}
                                                        className="booking__hours__block__demi__hour"
                                                    >
                                                        <button
                                                            type="button"
                                                            // au click selectionne heure
                                                            onClick={() =>
                                                                setDate((prev) => ({
                                                                    ...prev,
                                                                    justTime: time,
                                                                }))
                                                            }
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                color:
                                                                    capacity <=
                                                                    nbDinnerConvivesAtDate
                                                                        ? '#3d1111da'
                                                                        : '#fff',
                                                            }}
                                                            disabled={
                                                                capacity <= nbDinnerConvivesAtDate
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            {format(time, 'kk:mm')}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            {!errorDinner && (
                                                <div
                                                    className={
                                                        capacity <= nbDinnerConvivesAtDate
                                                            ? `complet`
                                                            : `places`
                                                    }
                                                >
                                                    {capacity <= nbDinnerConvivesAtDate
                                                        ? `Complet`
                                                        : `Il reste ${
                                                              capacity - nbDinnerConvivesAtDate
                                                          } places`}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    ) : (
                        // ------------------------- block calendrier-----------------------------
                        <>
                            <ReactCalendar
                                minDate={new Date()}
                                view="month"
                                onClickDay={(date) =>
                                    setDate(() => ({
                                        justDate: date,
                                    }))
                                }
                            />
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
