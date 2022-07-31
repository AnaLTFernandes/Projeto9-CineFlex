import styled from "styled-components";

import { useLocation } from "react-router-dom";

import facebook from '../images/logo-facebook.svg';
import instagram from '../images/logo-instagram.svg';
import twitter from '../images/logo-twitter.svg';
import whatsapp from '../images/logo-whatsapp.svg';
import comments from '../images/comments.svg';

export default function Overview () {

    const { state } = useLocation();

    return (
        <>
            <Banner>
                <div>
                    <img alt={state.title} src={state.posterURL}/>
                    <span>{state.title}</span>
                </div>
            </Banner>
            <Container>
                <h1>Sinopse</h1>
                <p>{state.overview}</p>
            </Container>
            <Footer>
                <div></div>
                <Images>
                    <img alt="facebook" src={facebook}/>
                    <img alt="instagram" src={instagram}/>
                    <img alt="twitter" src={twitter}/>
                    <img alt="whatsapp" src={whatsapp}/>
                    <img alt="comments" src={comments}/>
                </Images>
            </Footer>
        </>
    );
}

const Banner = styled.div`
    height: 190px;
    background-color: rgba(0,0,0,0.8);
    box-shadow: 2px 0 4px 4px rgb(0 0 0 / 80%);
    margin: 67px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
        width: 90%;
        display: flex;
        align-items: center
    }

    span {
        margin-left: 40px;
        font-size: 22px;
        color: #FFFFFF;
    }

    img {
        width: 87px;
        height: auto;
        box-shadow: 0 0 6px 3px rgb(255 255 255 / 20%);
    }
`;

const Container = styled.main`
    width: 90%;
    margin: 50px auto 0;

    h1 {
        height: 40px;
        font-size: 20px;
        font-weight: 700;
    }

    p {
        font-size: 18px;
        line-height: 22px;
    }
`;

const Footer = styled.footer`
    width: 90%;
    margin: 40px auto 0;
    border-radius: 50%;

    div {
        width: 100%;
        height: 2px;
        background: rgb(232,131,58);
        background: linear-gradient(270deg, rgba(232,131,58,1) 0%, rgba(169,199,224,1) 80%);
    }
`;

const Images = styled.div`
    && {
        width: 100%;
        height: auto;
        background: transparent;
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;

        img {
            width: 20px;
            height: auto;
            margin-left: 10px;
            cursor: pointer;
        }
    }
`;