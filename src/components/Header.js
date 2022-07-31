import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import back from '../images/back.svg';

export default function Header ({ home }) {
    const navigate = useNavigate();

    function goBack (event) {
        event.preventDefault();
        navigate(-1);
    }

    return (
        <Head>
            {!home ? <img alt='voltar' src={back}  onClick={goBack} /> : ''}
            CINEFLEX
        </Head>
    );
}

const Head = styled.header`
    width: 100%;
    height: 67px;
    background-color: #C3CFD9;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    font-weight: 400;
    color: #E8833A;

    img {
        width: 36px;
        height: auto;
        position: fixed;
        left: 5px;
        filter: invert(0.4);
        cursor: pointer;
    }
`;