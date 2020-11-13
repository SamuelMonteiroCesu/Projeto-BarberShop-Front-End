import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #F0F4F4;
    border-radius: 10px;
    border: 2px solid #939393;
    padding: 16px;
    width: 100%;
    color: #939393;

    display: flex;
    align-items: center;
    

    & + div{
        margin-top 10px;
    }

    ${(props) =>
        props.isErrored && css`
            border-color: #c53030;
        `}
    
    ${(props) =>
        props.isFocused && css`
            border-color: #FFFFFF;
        `}

    
    input{
        flex: 1;
        color: #939393;
        background: transparent;
        border: 0;
        &::placeholder{
            color: #939393;
        }

    }

    svg{
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`

    height: 20px;
    margin-left: 16px;
    svg{
        margin: 0px;
    }

    span{
        background: #c53030;
        color: #FFFFFF;

        &::before{
            border-color: #c53030 transparent;
        }
    }
`;

export function cpf(e: React.FormEvent<HTMLInputElement>){
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1-$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    e.currentTarget.value = value;
    return e;
}

export function datas(e: React.FormEvent<HTMLInputElement>){
    e.currentTarget.maxLength = 8;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d)(\d{2})$/, "$1/$2");
    //value = value.replace(/(?=(\d{2})+(\D))\B/g, "/");
    e.currentTarget.value = value;
    return e;
}

export function currency(e: React.FormEvent<HTMLInputElement>){
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1.$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    //value = value.replace(/(?=(\d{2})+(\D))\B/g, "/");
    e.currentTarget.value = value;
    return e;
}

export function hours(e: React.FormEvent<HTMLInputElement>){
    e.currentTarget.maxLength = 5;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1:$2");
    e.currentTarget.value = value;
    return e;
}