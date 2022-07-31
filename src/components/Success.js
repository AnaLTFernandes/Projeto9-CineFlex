import styled from 'styled-components';

import { useLocation, Link } from 'react-router-dom';

function CpfFormater ({ cpf }) {
    let cpfFormated = '';

    for (let i = 1; i <= cpf.length; i++) {

        if (i % 3 === 0 && i !== 9) {
            cpfFormated += `${cpf[i-1]}.`;
        }
        else if (i === 9) {
            cpfFormated += `${cpf[i-1]}-`;
        }
        else {
            cpfFormated += cpf[i-1];
        }
    }

    return cpfFormated;
}

export default function Success ({ setHome }) {
    const { state } = useLocation();
    setHome(true);

    return (
        <Main>

            <Title>Pedido feito com sucesso!</Title>

            <div>
                <h1>Filme e sessão</h1>

                <span>{state.movieTitle}</span>
                <span>{state.movieDate} {state.movieSession}</span>
            </div>

            <div>
                <h1>Ingressos</h1>

                {state.seatsName.map((name, index) => (
                    <span key={index}>Assento {name}</span>
                ))}
            </div>

            <div>
                <h1>Comprador</h1>

                <span>Nome: {state.name}</span>
                <span>CPF: <CpfFormater cpf={state.cpf}/></span>
            </div>

            <Link to='/'><button>Voltar para Home</button></Link>
        </Main>
    );
}

const Main = styled.main`
    width: 90%;
    min-width: 340px;
    height: 100%;
    margin: 67px auto 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    }

    h1 {
        width: 100%;
        height: auto;
        color: #293845;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
        justify-content: flex-start;
    }

    span {
        width: 100%;
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 5px;
        color: #293845;
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

    @media (min-width: 430px) {
        width: fit-content;
    }
`;

const Title = styled.h1`
    && {
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: auto;
        font-size: 24px;
        font-weight: 700;
        color: #247A6B;
    }
`;