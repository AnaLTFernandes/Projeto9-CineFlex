import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading'
import Footer from '../Footer/Footer';

import './Seats.css';

function SeatUnavailable (visibility, setVisibily) {

    setVisibily('visible');

    setTimeout(() => {
        setVisibily('invisible');
    }, 2500);
}

function SeatsSection ({ name, isAvailable, selected, index, visibility, setVisibily }) {
    const [clicked, setClicked] = useState(selected);

    function click () {
        setClicked(!clicked);
    }

    function alert () {
        SeatUnavailable(visibility, setVisibily);
    }
    
    return (
        <div key={index}
            className={(`seat ${isAvailable ? 'available' : 'unavailable'} ${clicked ? 'selected' : ''}`).trim()}
            onClick={isAvailable ? click : alert}>
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
    const [places, setPlaces] = useState([]);
    const [visibility, setVisibily] = useState('invisible');
    const { idSession } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(response => setPlaces(response.data));
    }, [idSession]);

    let newSeats = [];

    if (places.length !== 0) {
        
        places.seats.map(seat => {
            if (seat.isAvailable) { 
                newSeats.push({...seat, selected: false});
            } else {
                newSeats.push({...seat});
            }
        });
    }

    return (
        (places.length === 0
            ?  (<Loading />)
            :   (<main className='section'>

                    <div className={(`seat-alert ${visibility}`).trim()}>
                        Esse assento não está disponível
                    </div>

                    <h1>Selecione o(s) assento(s)</h1>

                    <div className='seats'>
                        {newSeats.map(({ name, isAvailable, selected }, index) => (
                            <SeatsSection 
                                name={name} 
                                isAvailable={isAvailable} 
                                selected={selected} 
                                index={index} 
                                visibility={visibility} 
                                setVisibily={setVisibily} 
                            />
                        ))}
                    </div>

                    <SubtitleSeats />

                    <InputArea />

                    <Footer>
                        <div>
                            <div className='film-poster'>
                                <img alt={places.movie.title} src={places.movie.posterURL}/>
                            </div>
                            <div>
                                <div>
                                    <span>{places.movie.title}</span>
                                </div>
                                <div>
                                    <span>{places.day.weekday} - {places.name}</span>
                                </div>
                            </div>
                        </div>
                    </Footer>
            
                </main>)
        )
    );
}