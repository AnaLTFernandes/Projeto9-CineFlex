import styled from 'styled-components';

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Loading from './Loading';
import Footer from './Footer';

import more from '../images/more.svg';


function Times ({ showtimes }) {
    return (
        <SessionTimes>

            {showtimes.map(({ name, id }, index) =>

                <Link to={`/assentos/${id}`} key={index}>
                    <div>{name}</div>
                </Link>
            )}
        </SessionTimes>
    );
}

function Days ({ days }) {
    return (
        days.map(({ weekday, date, showtimes }, index) =>

            <Session key={index}>

                <span>{weekday} - {date}</span>

                <Times showtimes={showtimes}/>

            </Session>
        )
    );
}

export default function Sessions ({ setHome }) {
    const [sessions, setSessions] = useState([]);
    const { idFilme } = useParams();

    const navigate = useNavigate();
    
    setHome(false);

    useEffect (() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response => setSessions(response.data));
    }, [idFilme]);

    function seeMore(event) {
        event.preventDefault();

        navigate(`/${sessions.title}/overview`, { state: sessions });
    }

    return (
        (sessions.length === 0
            ?  (<Loading />)
            :   (<Main>

                    <h1>Selecione o horário</h1>

                    <Days days={sessions.days}/>

                    <Footer>
                        <Container>
                            <Poster>
                                <img alt={sessions.title} src={sessions.posterURL}/>
                            </Poster>
                            <Data>
                                <span>{sessions.title}</span>
                            </Data>
                            <Image alt='more' src={more} onClick={seeMore}/>
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

const Session = styled.div`
    width: 300px;
    margin-bottom: 30px;

    span {
        font-weight: 400;
        font-size: 20px;
    }
`;

const SessionTimes = styled.div`
    width: 175px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;

    div {
        width: 83px;
        height: 43px;
        border-radius: 3px;
        background-color: #E8833A;
        font-weight: 400;
        font-size: 18px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    div:hover {
        filter: brightness(0.8);
    }
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    @media (min-width: 430px) {
        width: fit-content;
        min-width: 300px;
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
`;

const Data = styled.div`
    width: 73%;
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

const Image = styled.img`
    width: 25px;
    height: auto;
    position: absolute;
    top: -3px;
    right: 10%;
    opacity: 0.6;
    cursor: pointer;

    &:hover {
        opacity: 0.3;
    }

    @media (min-width: 430px) {
        right: -10px;
    }
`;