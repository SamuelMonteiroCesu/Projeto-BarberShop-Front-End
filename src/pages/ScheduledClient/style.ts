import styled from "styled-components";
import { shade } from 'polished';
import { DatePicker } from "antd";

export const Container = styled.div`

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        margin-top: 20px;
        font-size: 28px;
        color: #FFFFFF
    }
    input{
        margin: 4px 0 16px;
        width: 340px;
        text-align: left;
        background: #F0F4F4;
        border-radius: 10px;
        border: 2px solid #939393;
        padding: 12px;
        color: #939393;

        display: flex;
        align-items: center;
    }
    select{
        margin: 4px 0 16px;
        width: 340px;
        text-align: left;
        background: #F0F4F4;
        border-radius: 10px;
        border: 2px solid #939393;
        padding: 12px;
        color: #939393;

        display: flex;
        align-items: center;
    }

    button{
        background: #5D6D7E;
        color: #F0F4F4;
        height: 56px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        width: 340px;
        font-weight: 500;
        margin-top: 8px;
        transition: background-color 0.2s;

        &:hover{
            background: ${shade(0.2, '#5D6D7E')};
        }
    }

    a{
        color: #FFFFFF;
        display: block;
        margin-top: 8px;
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
    align-item: center;
    margin-top: 16px;
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

export const Days = styled(DatePicker)`

    background: #F0F4F4;
    border-radius: 10px;
    border: 2px solid #939393;
    width: 340px;
    color: #939393;
`;

