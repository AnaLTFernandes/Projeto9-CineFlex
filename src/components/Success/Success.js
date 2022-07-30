import { useLocation, Link } from 'react-router-dom';

import './Success.css';

function CpfFormater ({ cpf }) {
    let cpfFormated = '';

    for (let i = 1; i <= cpf.length; i++) {
        if (i % 3 === 0 && i !== 9) {
            cpfFormated += `${cpf[i-1]}.`;
        } else if (i === 9) {
            cpfFormated += `${cpf[i-1]}-`;
        } else {
            cpfFormated += cpf[i-1];
        }
    }

    return cpfFormated;
}

export default function Success () {
    const { state } = useLocation();
    
    return (
        <main className='section success'>

            <h1>Pedido feito com sucesso!</h1>

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
        </main>
    )
}