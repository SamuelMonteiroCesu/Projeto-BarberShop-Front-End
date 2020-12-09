import React, { useState, useEffect, useCallback } from 'react';
import Table from 'react-bootstrap/esm/Table';
import api from '../../services/api';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { Links, Calendar, Content, Container, Days } from './style';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';

import 'react-day-picker/lib/style.css';
import { useAuth } from '../../hooks/auth';
import moment from 'moment'
import 'moment/locale/pt-br';
import 'antd/dist/antd.css';
import locale from 'antd/es/date-picker/locale/pt_BR'


interface profeProps {
    id: number,
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    is_staff: Boolean,
}

interface clientProps {
    id: number,
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    is_staff: Boolean,
}

interface paymentsProps {
    payments_id: string,
    name: string,
}
interface procedureProps {
    procedure_id: string,
    name: string,
}

interface statusProps {
    status_id: string,
    name: string,
    active: string,
}

interface SchedulesProps {
    id: string,
    appdate: string,
    apphour: string,
    client: clientProps,
    total: string,
    professional: profeProps,
    procedure: procedureProps,
    payment: paymentsProps,
    status: statusProps,
}

interface testeProps {
    professional: profeProps,
    date: string,
}

interface professionalProps {
    id: string,
    first_name: string,
}

const ScheduledTest: React.FC = () => {

    const { user } = useAuth();

    const history = useHistory()
    const { addToast } = useToast();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [schedules, setSchedules] = useState<SchedulesProps[]>([]);
    const [dates, setDates] = React.useState(moment());
    const [professionals, setProfessionals] = useState<professionalProps[]>([]);
    const [freeschedule, setFreeschedule] = useState<testeProps[]>([]);
    const [professional, setProfessional] = useState(user.id.toString());
    const [statu, setStatu] = useState('');
    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);


    function scheduleClient(id: String) {
        if (id === null) {
            history.push('/agendar_cliente/');
        } else {
            history.push(`/agendar_cliente/${id}`);
        }
    }

    useEffect(() => {
        api.get('/appointment/').then((response) => {
           
        })
    }, []);

    useEffect(() => {
        api.get('/getprof/').then((response) => {
            setProfessionals(response.data);
           
        })
    }, [setProfessionals]);

    useEffect(() => {
        api.post('/freeschedule/', handlerDates()).then((response: any) => {
            setSchedules([]);
            let { data } = response;
            setSchedules(data);
            //alert(data);
        });
    }, [dates, professional]);

    async function editStatus(id: string) {
        await api.patch(`/appointment/${id}/`, teste());
        addToast({
            type: 'success',
            title: 'Horário atualizado com sucesso!',
        });
    }

    function teste() {
        const fd = new FormData()
        fd.append("status", '159');
        return fd;
    }

    function handlerDates() {
        const fd = new FormData()
        fd.append("date", dates.format('DD/MM/YYYY'))
        fd.append("professional", professional)
        return fd;
    }

    return (
        <Container>
            <Content>
                <br />

                <div className="container">
                    <div className="task-header">
                        <h1>Agendamentos {dates.format('DD/MM/YYYY')}</h1>
                    </div>
                    <br />
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Horario</th>
                                <th>Cliente</th>
                                <th>Procedimento</th>
                                <th>Pagamento</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody id="tabela">
                            {
                                (() => {
                                    return schedules.map((schedule) => {
                                        let { appdate, apphour, professional, client, payment, procedure, status } = schedule
                                       
                                        if (!professional) {
                                            return (
                                                <tr key={professional}>
                                                    <td>{status}</td>
                                                    <td>{apphour}</td>
                                                    <td>{client}</td>
                                                    <td>{procedure}</td>
                                                    <td>{payment}</td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            variant="info"
                                                            onClick={() => {
                                                                sessionStorage.setItem('appdate', appdate)
                                                                sessionStorage.setItem('apphour', apphour)
                                                                scheduleClient(schedule.id)
                                                            }}
                                                        >Editar
                                            </Button>{' '}

                                                    </td>
                                                </tr>
                                            )
                                        }
                                        return (
                                            <tr key={professional.id}>
                                                <td>{status.name}</td>
                                                <td>{apphour}</td>
                                                <td>{client.first_name}</td>
                                                <td>{procedure.name}</td>
                                                <td>{payment.name}</td>
                                                <td>
                                                    <Button
                                                        size="sm"
                                                        variant="info"
                                                        onClick={() => {
                                                            sessionStorage.setItem('appdate', appdate)
                                                            sessionStorage.setItem('apphour', apphour)
                                                            scheduleClient(schedule.id)
                                                        }}
                                                    >Editar
                                            </Button>{' '}
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        onClick={() => {
                                                            editStatus(schedule.id)
                                                        }}
                                                    >Atendido
                                            </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                })()
                            }
                        </tbody>

                    </Table>
                    <Links>
                        <Link to="/dashboard">
                            <FiArrowLeft />
                    Voltar
                </Link>
                    </Links>
                </div>
                <Calendar>
                    <select name="professional" onChange={e => { setProfessional(e.target.value) }} value={professional}>
                        <option value="">Selecione o profissional</option>
                        <option value={user.id.toString()}>{user.first_name}</option>
                        {professionals.map((professionals) => (
                            <option key={professionals.id} value={professionals.id}>{professionals.first_name}</option>
                        ))}
                    </select>
                    <Days
                        format="DD/MM/YYYY"
                        //className="form-control"
                        locale={locale}
                        //id="begin"
                        value={dates}
                        onChange={(date: any) => setDates(date)}
                    />
                   
                </Calendar>

            </Content>
        </Container>
    );
};

export default ScheduledTest;