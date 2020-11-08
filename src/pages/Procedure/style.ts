import styled from 'styled-components';
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

    place-content: center;
    
    width: 100%;
    max-width: 700px;

    form{
        margin: 80px 0 16px;
        width: 340px;
        text-align: center;
    }

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


export const ListContainer = styled.div`
    p{
        
        margin-bottom: 12px;
    }
 `