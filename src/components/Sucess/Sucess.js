import './Sucess.css';

export default function Sucess () {
    return (
        <main className='section'>

            <h1>Pedido feito com sucesso!</h1>

            <div>
                <h1>Filme e sessão</h1>
                <span>Enola Holmes</span>
                <span>24/06/2021 15:00</span>
            </div>
            <div>
                <h1>Ingressos</h1>
                <span>Assento 15</span>
                <span>Assento 16</span>
            </div>
            <div>
                <h1>Comprador</h1>
                <span>Nome: João da Silva Sauro</span>
                <span>CPF: 123.456.789-10</span>
            </div>

            <button>Voltar para Home</button>
    
        </main>
    )
}