import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers, Modifier } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
    Header, 
    HeaderContent,
    Profile,
    Content,
    Appointments,
    Container,
    Schedule,
    NextAppointment,
    Section,
    Calendar
} from './styled';

import {BiLogOutCircle, BiUserCircle} from 'react-icons/bi';
import {FiClock, FiPower} from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Link, useHistory } from 'react-router-dom';


const Scheduled: React.FC = () =>{

    const [selectedDate, setSelectedDate] = useState(new Date());
    const history = useHistory(); 
    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) =>{
        if(modifiers.available){
            setSelectedDate(day);
        }
         
    }, []); 

    const {logout } = useAuth();
    function Back(){
        history.goBack();
    }
    return(
        <Container>
            <Header>
                <HeaderContent>
                    <Profile>
                        <BiUserCircle/>
                            <div>
                                <span>Bem-vindo,</span>
                                <Link to="/perfil">
                                    <strong>Samuel Monteiro</strong>
                                </Link>
                            </div>
                    </Profile>
                        <button type="button" onClick={Back}>
                            <BiLogOutCircle/>
                        </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 25</span>
                        <span>Quarta-feira</span>
                    </p>
                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <BiUserCircle/>
                            <p>José Silva</p>
                            <span>
                                <FiClock/>
                                08:00
                            </span>
                            
                        </div>
                    </NextAppointment>
                    <Section>
                        <strong>Manhã</strong>
                        <Appointments>
                            <span>
                                <FiClock/>
                                09:00
                            </span>
                            <div>
                                <BiUserCircle/>
                                <p>João</p>
                            </div>
                        </Appointments>
                    </Section>
                    <Section>
                        <strong>Tarde</strong>

                        <Appointments>
                            <span>
                                <FiClock/>
                                13:00
                            </span>
                            <div>
                                <BiUserCircle/>
                                <p>João</p>
                            </div>
                        </Appointments>
                    </Section>
                </Schedule>

                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[{daysOfWeek: [0, 6]}]}
                        modifiers={{
                            available: {daysOfWeek: [1, 2, 3, 4, 5]}
                        }}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abriu',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',

                        ]}
                    />
                </Calendar>
            </Content>  
        </Container>
    );
}

export default Scheduled;