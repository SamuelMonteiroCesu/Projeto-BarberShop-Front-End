import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
//import LoginBackground from '../../assets/back.jpg'


export const Container = styled.div`
    height: 100vh;
    display: flex;
    aling-items: stretch;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #939393;
    place-content: center;
    position: absolute;
    width: 500px;
    height: 600px; 
    margin-top: 24px;
    margin-left: 100px;
    max-width: 700px;
    border-radius: 10px;
`;

const apparFromLeft = keyframes `
    from{
        opacity: 0;
        transform: translateX(-50px); 
    }
    to{
        opacity: 1;
        transform: translateX(0);   
    }
`;

export const AnimationContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    animation: ${apparFromLeft} 1s;

    form{
        margin: 80px 0 16px;
        width: 340px;
        text-align: center;
    }

    h1{
        margin-bottom: 24px;
    }

    a{
        color: #F0F4F4;
        display: block;
        margin-top: 16px;
        text-decoration: none;
        transition: color 0.2s;

        display: center;
        aling-item: center;

        svg{
            margin-right: 8px;
        }

        &:hover{
            color: ${shade(0.2, '#F0F4F4')};
        }

    }
`;

// export const Background = styled.div`
//     flex: 1;
//     background: url(${LoginBackground}) no-repeat center;
//     background-size: cover;

// &:hover{
//     color: ${shade(0.2, '#FFFFFF')};
// }
