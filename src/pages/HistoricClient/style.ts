import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    h1{
        font-size: 30px;
        color: #FFFFFF;
    }
`;

export const Links = styled.div`
    margin-top: 10px;
    font-size: 18px;
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