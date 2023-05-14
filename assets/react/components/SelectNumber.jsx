import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectNumber({ capacity }) {
    const [nbConvives, setNbConvives] = useState('');

    const handleChange = (event) => {
        setNbConvives(event.target.value);
    };

    const arrayNumbers = [];
    for (let i = 1; i <= capacity; i++) {
        arrayNumbers.push({ i });
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Nombre de personnes</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nbConvives}
                    label="nbConvives"
                    onChange={handleChange}
                >
                    return (
                    {arrayNumbers.map((number) => (
                        <MenuItem key={number.i} value={number.i}>
                            {number.i}
                        </MenuItem>
                    ))}
                    );
                </Select>
            </FormControl>
        </Box>
    );
}
