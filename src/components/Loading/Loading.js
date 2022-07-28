import loading from '../../images/spinner.gif'

import './Loading.css';

export default function Loading() {
    return (
        <div className='loading'>
            <img alt='Carregando...' src={loading} />
        </div>
    );
}