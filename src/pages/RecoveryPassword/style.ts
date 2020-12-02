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

    h1{
        color: #FFFFFF;
        font-size: 28px;
    }
    
    form{
        margin: 80px 0 16px;
        width: 340px;
        text-align: center;

    } 

    a{
        margin-top: 8px;
        text-decoration: none;
        color: #FFFFFF;

        &:hover{
            opacity: 0.8;
        }
    }

`;