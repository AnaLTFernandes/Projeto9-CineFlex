import styled from 'styled-components';

import loading from '../images/spinner.gif'

export default function Loading() {
    return (
        <LoadingWrapper>
            <img alt='Carregando...' src={loading} />
        </LoadingWrapper>
    );
}

const LoadingWrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 70px;
        height: 70px;
    }
`;