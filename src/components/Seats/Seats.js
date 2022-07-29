import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading'
import Footer from '../Footer/Footer';

import './Seats.css';

function SeatsSection ({ name, isAvailable, index }) {
    return (
        <div key={index}
            className={(`seat ${isAvailable ? 'available' : 'unavailable'}`).trim()}>
                {name}
        </div>
    );
}

function SubtitleSeats () {
    return (
        <div className='subtitle'>
            <div>
                <div className='subtitle-seat'></div>
                <span>Selecionado</span>
            </div>
            <div>
                <div className='subtitle-seat available'></div>
                <span>Disponível</span>
            </div>
            <div>
                <div className='subtitle-seat unavailable'></div>
                <span>Indisponível</span>
            </div>
        </div>
    );
}

function InputArea () {
    return (
        <div className='input-area'>
            <form>
                <div>
                    <label for='name'>Nome do comprador:</label>
                    <input id='name' type="text" required placeholder='Digite seu nome...'></input>
                </div>
                <div>
                    <label for='cpf' >CPF do comprador:</label>
                    <input if='cpf' type="text" required placeholder='Digite seu CPF...'></input>
                </div>
                <button>Reservar assento(s)</button>
            </form>
        </div>
    );
}

export default function Seats () {
    const [seats, setSeats] = useState([]);
    const { idSession } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(response => setSeats(response.data));
    }, [idSession]);

    console.log(seats)

    return (
        (seats.length === 0
            ?  (<Loading />)
            :   (<main className='section'>

                    <h1>Selecione o(s) assento(s)</h1>

                    <div className='seats'>
                        {seats.seats.map(({ name, isAvailable }, index) => (
                            <SeatsSection name={name} isAvailable={isAvailable} index={index}/>
                        ))}
                    </div>

                    <SubtitleSeats />

                    <InputArea />

                    <Footer>
                        <div>
                            <div className='film-poster'>
                                <img alt={seats.movie.title} src={seats.movie.posterURL}/>
                            </div>
                            <div>
                                <div>
                                    <span>{seats.movie.title}</span>
                                </div>
                                <div>
                                    <span>{seats.day.weekday} - {seats.name}</span>
                                </div>
                            </div>
                        </div>
                    </Footer>
            
                </main>)
        )
    );
}