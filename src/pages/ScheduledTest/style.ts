import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
//import LoginBackground from '../../assets/back.jpg'


export const Container = styled.div`
    h1{
        color: #FFFFFF;
        font-size: 34px;
    }
    h3{
        color: #FFFFFF;
    }
`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
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

export const Calendar = styled.aside`
    width: 300px;
    button{
        margin-top: 16px;
    }
`;