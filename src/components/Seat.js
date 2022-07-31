import styled from 'styled-components';

import { useState } from 'react';

import SeatUnavailable from "./SeatUnavailable";

export default function Seat ({
        name,
        isAvailable,
        selected,
        idSeat,
        index,
        setVisibility,
        idSeats,
        setIdSeats
    }) {

    const [clicked, setClicked] = useState(selected);

    function click () {
        setClicked(!clicked);

        const index = idSeats.indexOf(idSeat);

        if (!clicked && (index === -1)) {
            setIdSeats([...idSeats, idSeat]);
        }
        if (clicked && (index > -1)) {
            const ids = [...idSeats];
            ids.splice(index, 1);
            setIdSeats([...ids]);
        }
    }

    function alertUnavailable () {
        SeatUnavailable(setVisibility);
    }

    return (
        <SeatWrapper key={index}
            clicked={clicked}
            background={isAvailable ? '#C3CFD9' : '#FBE192'}
            border={isAvailable ? '#808F9D' : '#F7C52B'}
            cursor={isAvailable ? 'pointer' : 'default'}
            onClick={isAvailable ? click : alertUnavailable}>
                {name}
        </SeatWrapper>
    );
}

const SeatWrapper = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: ${props => (props.clicked ? '#8DD7CF' : props.background)};
    border: 1px solid ${props => (props.clicked ? '#1AAE9E' : props.border)};
    margin: 0 3px 18px;
    font-weight: 400;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    cursor: ${props => props.cursor};
`;