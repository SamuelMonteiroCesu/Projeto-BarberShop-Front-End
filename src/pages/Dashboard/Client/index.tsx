import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import locale from 'antd/es/date-picker/locale/pt_BR'
import 'moment/locale/pt-br';


import {Content, Container, Date, Times} from './style';

const DashboardClient: React.FC = () => {
    // const events = [
    //     { title: "ads3 - root", date: "2020-12-31", id: 3 },
    //     { title: "ads 3 - root", date: "2020-12-21", id: 4 },
    //     { title: "ads3 - root", date: "2020-12-21", id: 5 },
    //     { title: "ads3 - root", date: "2020-12-22", id: 6 },
    //     { title: "ads 3 - Projeto integrador", date: "2020-12-25", id: 1 },
    //     { title: "ads 3 - programação 1", date: "2020-12-22", id: 2 },
    //   ];
    const [ day, setDay] = useState(moment());

    const [ times, setTimes] = useState(moment());

    const format = 'HH:mm'
    const dateFormat = 'DD/MM/YYYY'
    function handlerSubmit(){

    }

    return (
        <Container>
            <Content>
        <Form onSubmit={handlerSubmit}>
            <Input type="text" placeholder="Profissional " name="profissional"/>
                
        </Form>
            <Date 
                onChange={(date: any) => { setDay(date) }}
                value={day}
                locale={locale}
                format={dateFormat}
            />
            <Times
                value={moment(times,format)}
                format={format}
                onChange={(date: any) => { setTimes(date) }}
            />
            </Content>
        </Container>
      )
}

export default DashboardClient;