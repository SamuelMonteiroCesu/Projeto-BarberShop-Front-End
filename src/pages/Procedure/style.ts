import styled from 'styled-components';
import { shade } from 'polished';
//import LoginBackground from '../../assets/back.jpg'


export const Container = styled.div`
    height: 100vh;
    display: flex;
    aling-items: stretch;

`;

export const Lists = styled.div`
    h1{ 
        font-size: 28px;
        margin-bottom: 24px;
        color: #FFFFFF;
    }
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

    form{
        margin: 80px 0 16px;
        width: 340px;
        text-align: center;
    }

    h1{ 
        font-size: 28px;
        margin-bottom: 24px;
        color: #FFFFFF;
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

export const Links = styled.div`
 
    a{
        color: #F0F4F4;
        text-decoration: none;
        
        svg{
            margin-right: 8px;
        }

        &:hover{
            color: ${shade(0.2, '#F0F4F4')};
        }
    }
    
`;

 