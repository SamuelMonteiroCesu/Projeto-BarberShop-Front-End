import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #808080;
    padding: 0 0 352px;
    place-content: center;
    
    width: 100%;
    max-width: 200px;

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
    margin-bottom: 0 auto;
    button{
        margin-top: 300px;
        background: transparent;
        border: 0;
        color: #F0F4F4;

        svg{
            margin-right: 5px; 
            color: #F0F4F4;
            width: 18px;
            height: 18px;
            
        }
        
    }
    animation: ${apparFromLeft} 1s;

    h1{
        margin-bottom: 24px;
    }

    a{
        color: #FFFFFF;
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
            color: ${shade(0.2, '#FFFFFF')};
        }
    }
`;

export const Header = styled.header`
    padding: 32px 0;
    background: #808080; 
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    button{
        margin-left: auto;
        background: transparent;
        border: 0;

        svg{
            color: #FFFFFF;
            width: 20px;
            height: 20px;
        }
    }

`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    svg{
        color: #E0E0E0;
        width: 50px;
        height: 50px;
    }

    div{
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span{
            color: #E0E0E0;
        }
        a{
            text-decoration: none;
            color: FFFFFF;
            
        }
    }

`;