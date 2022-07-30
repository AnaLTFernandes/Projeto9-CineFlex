import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading'
import Footer from '../Footer/Footer';

import './Seats.css';

function SeatUnavailable (setVisibily) {

    setVisibily('visible');

    setTimeout(() => {
        setVisibily('invisible');
    }, 2500);
}

function SeatsSection ({ name, isAvailable, selected, idSeat, index, setVisibily, idSeats, setIdSeats }) {
    const [clicked, setClicked] = useState(selected);

    function click () {
        setClicked(!clicked);

        const index = idSeats.indexOf(idSeat);

        if (!clicked && (index === -1)) {
            setIdSeats([...idSeats, idSeat])
        }
        if (clicked && (index > -1)) {
            const ids = [...idSeats];
            ids.splice(index, 1);
            setIdSeats([...ids]);
        }
    }

    function alert () {
        SeatUnavailable(setVisibily);
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

function InputArea ({ idSeats, data }) {

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');

    const navigate = useNavigate();
     
    function handleSubmit (event) {
        event.preventDefault();

        if (idSeats.length > 0) {
            const obj = {
                ids:[...idSeats],
                name,
                cpf
            }

            const newData = {
                ...data,
                ...obj
            }

            const promise = axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, obj);
            promise.then(navigate('/sucesso', { state: newData}));
        }
    }

    return (
        <div className='input-area'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Nome do comprador:</label>
                    <input 
                        required 
                        id='name' 
                        type="text" 
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder='Digite seu nome...'></input>
                </div>
                <div>
                    <label htmlFor='cpf'>CPF do comprador:</label>
                    <input 
                        required 
                        id='cpf' 
                        type="text" 
                        value={cpf}
                        onChange={event => setCpf(event.target.value)}
                        pattern='([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'
                        placeholder='Digite seu CPF...'></input>
                </div>
                <button>Reservar assento(s)</button>
            </form>
        </div>
    );
}

export default function Seats () {
    const [places, setPlaces] = useState([]);
    const [visibility, setVisibily] = useState('invisible');
    const [idSeats, setIdSeats] = useState([]);
    const { idSession } = useParams();
    
    let data = {};

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(response => setPlaces(response.data));
    }, [idSession]);

    function dados (info) {
        data = {
            movieTitle: info.movie.title,
            movieDate: info.day.date,
            movieSession: info.name
        }
    }

    const newSeats = [];
    const seatsName = [];

    if (places.length !== 0) {

        dados(places)
        
        places.seats.map(seat => {
            newSeats.push({...seat, selected: false});
        });

        newSeats.map(seat => {
            if (idSeats.includes(seat.id)) {
                seatsName.push(seat.name);
            }
        })

        data = {
            ...data,
            seatsName
        }
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
                        {newSeats.map(({ name, isAvailable, selected, id }, index) => (
                            <SeatsSection 
                                key={index}
                                name={name} 
                                isAvailable={isAvailable} 
                                selected={selected} 
                                idSeat={id}
                                index={index} 
                                visibility={visibility} 
                                setVisibily={setVisibily} 
                                idSeats={idSeats}
                                setIdSeats={setIdSeats}
                            />
                        ))}
                    </div>

                    <SubtitleSeats />

                    <InputArea idSeats={idSeats} data={data}/>

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