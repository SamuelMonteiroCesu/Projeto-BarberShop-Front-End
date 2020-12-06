import React, {useState, useEffect, useCallback, useMemo} from 'react';
import Table from 'react-bootstrap/esm/Table';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { Links, Calendar, Content, Container } from './style';
import { useToast } from '../../hooks/toast';
import { info } from 'console';
import { FiArrowLeft } from 'react-icons/fi';
import DayPicker, { DayModifiers, Modifier } from 'react-day-picker';
import 'react-day-picker/lib/style.css'; 
import { useAuth } from '../../hooks/auth';
import { isImportOrExportSpecifier } from 'typescript';
import { isToday, format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { object } from 'yup';
import { Form } from '@unform/web';
import Input from '../../components/Input';

interface SchedulesProps{
    id: string,
    appdate: string,
    apphour: string,
    client: string,
    total: string,
    professional: string,
}

interface testeProps{
    professional: string,
    date: string,
    
}

const ScheduledTest: React.FC = () =>{

    const { user } = useAuth();
    const history = useHistory()
    const { addToast } = useToast();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ currentMonth, setCurrentMonth ] = useState(new Date());
    const [schedules, setSchedules] = useState<SchedulesProps[]>([]);

    // const [appointments, setAppointments] = useState<SchedulesProps>(() =>{
    //     const retAppdata = sessionStorage.getItem()
    // }); 

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) =>{
        if(modifiers.available){
            setSelectedDate(day);
            console.log('ESTAMOS AQUI', day);
        }
         
    }, []);
    const handleMonthChange = useCallback((month: Date) =>{
        setCurrentMonth(month);
    }, []);


    function scheduleClient(id: String){
        if(id === null){
            history.push('/agendar_cliente/'); 
        }else{
            history.push(`/agendar_cliente/${id}`);
        }
    }


    const handlerSubmit = useCallback (async (data: testeProps) => {
        const response = await api.post('/freeschedule/', data);
        console.log(user.id);
        setSchedules(response.data);
    },[])
    return(
        <Container>
        <Content>
        <br/>
        
        
        <div className="container">
            <div className="task-header">
                <h1>Agedamentos</h1>
               
            </div>
            <br/>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Data</th>
                    <th>Horario</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                     {
                        schedules.map((schedule)=>(
                        <tr key={schedule.professional}>
                        <td>{schedule.appdate}</td>
                        <td>{schedule.apphour}</td>
                        <td>{schedule.client}</td>
                        <td>{schedule.total}</td>
                        <td>
                            <Button 
                                size="sm" 
                                variant="info" 
                                onClick={() => {
                                    sessionStorage.setItem('appdate', schedule.appdate)
                                    sessionStorage.setItem('apphour', schedule.apphour)
                                    scheduleClient(schedule.id)
                                }}
                                >Editar
                            </Button>{' '}
                            <Button 
                                size="sm" 
                                variant="danger" 
                                >Remover
                            </Button>
                        </td>
                    </tr>
                    ))}
                 </tbody> 
                 
            </Table> 
            <Links>
                <Link to="/dashboard">
                <FiArrowLeft/>
                    Voltar
                </Link>
            </Links>
        </div> 
            <Calendar> 
            {/* <p><span>{teste}</span></p> */}
                {/* <DayPicker
                    weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                    fromMonth={new Date()}
                    // disabledDays={[{daysOfWeek: [0, 6]}]}
                    modifiers={{
                        available: {daysOfWeek: [1, 2, 3, 4, 5, 6]}
                    }}
                    onMonthChange={handleMonthChange}
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
                /> */}
                <Form onSubmit={ handlerSubmit } >
                    <h3>Informe o profissional</h3>
                  <Input  type="text" name="professional" placeholder="ID"/>
                  <Input type="text" name="date" placeholder="DD/MM/AAAA"/>
                  <Button type="submit">Pesquisar</Button>
                </Form>
                {/* <p>{selectedDate.toLocaleDateString()}</p> */}
            </Calendar>
                
        </Content>
        </Container>
    );
};

export default ScheduledTest;