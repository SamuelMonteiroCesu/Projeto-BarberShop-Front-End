import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #939393;
    border-radius: 10px;
    border: 2px solid #939393;
    padding: 16px;
    width: 100%;
    color: #FFFFFF;

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
        color: #FFFFFF;
        background: transparent;
        border: 0;
        &::placeholder{
            color: #FFFFFF;
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