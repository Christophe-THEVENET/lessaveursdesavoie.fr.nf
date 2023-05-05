import { Paper } from '@mui/material';
import React, { useState } from 'react';

const Item = ({ dish }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = (event) => {
        setIsHovering(true);
    };

    const handleMouseLeave = (event) => {
        setIsHovering(false);
    };

    return (
        <Paper
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#523c48',
                position: 'relative',
            }}
        >
            <img
                src={`../uploads/dishes/${dish.imageName}`}
                style={{
                    width: '100%',
                    height: '50rem',
                    boxShadow: '0px 0px 12px -1px rgba(0,0,0,0.68)',
                    position: 'relative',
                    filter: isHovering ? 'brightness(20%)' : 'brightness(100%)',
                    transition: 'all 0.5s ease',
                }}
                className="dish-image"
                alt={`image du plat ${dish.name}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            {isHovering ? (
                <h2
                    style={{
                        position: 'absolute',
                        fontFamily: 'Great Vibes',
                        color: '#dc8cba',
                        fontSize: '6rem',
                        transition: 'all 0.5s ease',
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {dish.name}
                </h2>
            ) : null}
        </Paper>
    );
};
export default Item;
