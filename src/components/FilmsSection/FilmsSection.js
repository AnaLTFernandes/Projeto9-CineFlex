import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './FilmsSection.css';

export default function FilmsSection () {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');
        promise.then(response => setMovies(response.data));
    }, []);

    return (
        <main>
            <h1>Selecione o filme</h1>

            <div className='contents'>
                {movies.map(({ title, posterURL, id }, index) =>
                    <Link to={`/filme/${id}`}>
                        <div key={index} className='film-poster'>
                            <img alt={title} src={posterURL}/>
                        </div>
                    </Link>
                )}
            </div>
        </main>
    );
}