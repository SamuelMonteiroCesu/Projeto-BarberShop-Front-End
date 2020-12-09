import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { DatePicker } from "antd";


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

    select{
        background: #F0F4F4;
        border-radius: 10px;
        border: 2px solid #939393;
        padding: 16px;
        width: 340px;
        color: #939393;
        margin: 12px 0 12px 0;
        display: flex;
        align-items: center;
    }
`;

export const Days = styled(DatePicker)`

    background: #F0F4F4;
    border-radius: 10px;
    border: 2px solid #939393;
    padding: 16px;
    width: 340px;
    color: #939393;

    display: flex;
    align-items: center;
`;
