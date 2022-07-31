import styled from "styled-components";

export default function SubtitleSeats () {
    return (
        <Subtitle>
            <div>
                <Seat background='#8DD7CF' border='#1AAE9E'/>
                <span>Selecionado</span>
            </div>
            <div>
                <Seat background='#C3CFD9' border='#808F9D'/>
                <span>Disponível</span>
            </div>
            <div>
                <Seat background='#FBE192' border='#F7C52B'/>
                <span>Indisponível</span>
            </div>
        </Subtitle>
    );
}

const Subtitle = styled.div`
    display: flex;
    justify-content: center;

    div {
        width: 105px;
        text-align: center;
    }

    span {
        font-weight: 400;
        font-size: 13px;
    }
`;

const Seat = styled.div`
    && {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: ${props => props.background};
        border: 1px solid ${props => props.border};
        margin: 0 auto 9px;
    }
`;