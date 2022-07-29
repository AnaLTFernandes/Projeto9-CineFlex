import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading'
import Footer from '../Footer/Footer';

import './Sessions.css';


function Times ({ showtimes }) {
    return (
        <div className='session-times'>
            {showtimes.map(({ name, id }, index) => 
                <Link to={`/assentos/${id}`} key={index}>
                    <div>{name}</div>
                </Link>
            )}
        </div>
    );
}

export default function Sessions () {
    const [sessions, setSessions] = useState([]);
    const { idFilme } = useParams();

    useEffect (() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then(response => setSessions(response.data));
    }, [idFilme]);

    return (
        (sessions.length === 0
            ?  (<Loading />)
            :   (<main className='section'>

                    <h1>Selecione o horário</h1>

                    {sessions.days.map(({ weekday, date, showtimes }, index) =>
                        <div key={index} className='session'>
                            <span>{weekday} - {date}</span>

                            <Times showtimes={showtimes}/>
                            
                        </div>
                    )}

                    <Footer>
                        <div>
                            <div className='film-poster'>
                                <img alt={sessions.title} src={sessions.posterURL}/>
                            </div>
                            <div>
                                <span>{sessions.title}</span>
                            </div>
                        </div>
                    </Footer>
            
                </main>)
        )
    );
}