import styled from 'styled-components';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Loading from './Loading';

export default function Films ({ setHome }) {
    const [movies, setMovies] = useState([]);

    setHome(true);

    useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');
        promise.then(response => setMovies(response.data));
    }, []);

    return (
        (movies.length === 0
            ?   (<Loading />)
            :   (<Main>
                    <h1>Selecione o filme</h1>

                    <Container>

                        {movies.map(({ title, posterURL, id }, index) =>

                            <Link to={`/sessoes/${id}`} key={index}>

                                <Poster>
                                    <img alt={title} src={posterURL}/>
                                </Poster>

                            </Link>
                        )}
                    </Container>
                </Main>
            )
        )
    );
}

const Main = styled.main`
    width: 90%;
    min-width: 340px;
    height: 100%;
    margin: 67px auto 0;

    h1 {
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 400;
    }
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Poster = styled.div`
    width: 145px;
    height: 209px;
    border-radius: 3px;
    box-shadow: 0 2px 4px 2px rgba(0,0,0,0.1);
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 3px 11px;
    cursor: pointer;

    img {
        width: 129px;
        height: 193px;
    }

    &:hover {
        filter: brightness(0.8);
    }
`;