import styled from 'styled-components';

export const PlusImg = styled.img`
    z-index: 1;
    position: relative;
    text-align: center;
    margin-top: -20px;

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        margin-bottom: 5px;
        width: 23px;
        height: 23px;
    `}
`


export const ContentWrapper = styled.div`
    opacity: ${({ deactivated }) => deactivated ? "0.5" : "1"};
    pointer-events: ${({ deactivated }) => deactivated ? "none" : "default"};
`