import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    background: #2E2D2D;
    color: #F0F4F4;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover{
        background: ${shade(0.2, '#2E2D2D')};
    }
`;