import { stripUnit } from 'polished';
import styled, { keyframes } from 'styled-components';

import {DatePicker, TimePicker} from 'antd';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    aling-items: stretch;

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
`;

export const Date = styled(DatePicker)`
    background: #F0F4F4;
    border-radius: 10px;
    border: 2px solid #939393;
    padding: 16px;
    width: 100%;
    color: #939393;
`;

export const Times = styled(TimePicker)`
    background: #F0F4F4;
    border-radius: 10px;
    border: 2px solid #939393;
    padding: 16px;
    width: 100%;
    color: #939393;
`;