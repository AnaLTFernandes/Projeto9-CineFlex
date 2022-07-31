import styled from 'styled-components';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Loading from './Loading';
import Seat from './Seat';
import SubtitleSeats from './SubtitleSeats';
import InputArea from './InputArea';
import Footer from './Footer';


export default function Seats () {
    const [visibility, setVisibility] = useState('invisible');
    const [idSeats, setIdSeats] = useState([]);
    const [places, setPlaces] = useState([]);
    const { idSession } = useParams();

    const newSeats = [];
    const seatsName = [];
    let reserveData = {};

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSession}/seats`);
        promise.then(response => setPlaces(response.data));
    }, [idSession]);

    if (places.length !== 0) {

        for (let i = 0; i < places.seats.length; i++) {
            const seat = places.seats[i];

            newSeats.push({...seat, selected: false});

            if (idSeats.includes(seat.id)) {
                seatsName.push(seat.name)
            }
        }

        reserveData = {
            movieTitle: places.movie.title,
            movieDate: places.day.date,
            movieSession: places.name,
            seatsName
        }
    }

    return (
        (places.length === 0
            ?  (<Loading />)
            :   (<Main>

                    <SeatAlert 
                        top={(visibility === 'visible') ? '80px' : '0'}
                        opacity={(visibility === 'visible') ? '0.98' : '0'}>
                        Esse assento não está disponível
                    </SeatAlert>

                    <h1>Selecione o(s) assento(s)</h1>

                    <SeatsWrapper>
                        {newSeats.map(({ name, isAvailable, selected, id }, index) => (
                            <Seat
                                key={index}
                                name={name}
                                isAvailable={isAvailable}
                                selected={selected}
                                idSeat={id}
                                index={index}
                                visibility={visibility}
                                setVisibility={setVisibility}
                                idSeats={idSeats}
                                setIdSeats={setIdSeats}
                            />
                        ))}
                    </SeatsWrapper>

                    <SubtitleSeats />

                    <InputArea idSeats={idSeats} reserveData={reserveData}/>

                    <Footer>
                        <Container>
                            <Poster>
                                <img alt={places.movie.title} src={places.movie.posterURL}/>
                            </Poster>
                            <div>
                                <Data>
                                    <span>{places.movie.title}</span>
                                </Data>
                                <Data>
                                    <span>{places.day.weekday} - {places.name}</span>
                                </Data>
                            </div>
                        </Container>
                    </Footer>

                </Main>
            )
        )
    );
}

const Main = styled.main`
    width: 90%;
    min-width: 340px;
    height: 100%;
    margin-bottom: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 67px auto 160px;

    h1 {
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 400;
    }

    @media (min-width: 430px) {
        width: fit-content;
    }
`;

const SeatsWrapper = styled.div`
    width: 340px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0 auto;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 430px) {
        width: fit-content;
    }
`;

const Poster = styled.div`
    width: 64px;
    height: 89px;
    border-radius: 3px;
    box-shadow: 0 2px 4px 2px rgba(0,0,0,0.1);
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 14px 0 0;
    cursor: auto;

    img {
        width: 48px;
        height: 72px;
    }

    &:hover {
        filter: brightness(1);
    }
`;

const Data = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    span {
        height: 32px;
        font-weight: 400;
        font-size: 26px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (min-width: 430px) {
        width: auto;
    }
`;

const SeatAlert = styled.div`
    width: 270px;
    height: 40px;
    background-color: lightcoral;
    position: fixed;
    top: ${props => props.top};
    opacity: ${props => props.opacity};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    box-shadow: 0 1px 3px 0 grey;
    font-size: 16px;
    color: #FFFFFF;
    transition: all .2s linear;
`;