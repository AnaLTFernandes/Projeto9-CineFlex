import styled from 'styled-components';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function InputArea ({ idSeats, reserveData }) {

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');

    const navigate = useNavigate();

    function handleSubmit (event) {

        event.preventDefault();

        if (idSeats.length > 0) {
            const body = {
                ids:[...idSeats],
                name,
                cpf
            }

            const newData = {
                ...reserveData,
                ...body
            }

            const promise = axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, body);
            promise.then(navigate('/sucesso', { state: newData }));
        }
    }

    return (
        <Input>
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
                        pattern='([0-9]{11})'
                        placeholder='Digite seu CPF...'></input>
                </div>

                <button>Reservar assento(s)</button>
            </form>
        </Input>
    );
}

const Input = styled.div`
    width: 100%;
    margin-top: 41px;
    font-weight: 400;
    font-size: 18px;

    form, div {
        display: flex;
        flex-direction: column;
    }

    label {
        height: 21px;
    }

    input {
        height: 51px;
        background-color: #FFFFFF;
        border-radius: 3px;
        border: 1px solid #D4D4D4;
        margin-bottom: 14px;
        padding: 0 3px 0 18px;
        font-weight: 400;
        font-size: 18px;
    }

    input::placeholder {
        font-style: italic;
        color: #AFAFAF;
    }

    button {
        width: 225px;
        height: 42px;
        border-radius: 3px;
        border: none;
        background-color: #E8833A;
        font-weight: 400;
        font-size: 18px;
        color: #FFFFFF;
        margin: 40px auto 0;
        cursor: pointer;
    }

    button:hover {
        filter: brightness(0.8);
    }
`;