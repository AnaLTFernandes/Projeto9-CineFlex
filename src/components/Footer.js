import styled from 'styled-components';

export default function Footer ({ children }) {
    return (
        <FooterWrapper>
            {children}
        </FooterWrapper>
    );
};

const FooterWrapper = styled.footer`
    width: 100%;
    height: 117px;
    background-color: #DFE6ED;
    border-top: 1px solid #9EADBA;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 34px;
    font-weight: 400;
    padding: 0 10px;

    @media (min-width: 430px) {
        justify-content: center;
    }
`;