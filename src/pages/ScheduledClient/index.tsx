import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Container, Content, Days, Links } from './style';
import { Link, useHistory, useParams } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import { Form } from '@unform/web';
// import Input from '../../components/Input';
// import { constrainPoint } from '@fullcalendar/react';
// import { useAuth } from '../../hooks/auth';
import moment from 'moment'
import 'moment/locale/pt-br';

import 'antd/dist/antd.css';
import locale from 'antd/es/date-picker/locale/pt_BR'
import {useToast} from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { FiArrowLeft } from 'react-icons/fi';

interface statusProps {
    status_id: string,
    name: string,
}

interface procedureProps {
    procedure_id: string,
    name: string,
}

interface clientProps {
    id: string,
    first_name: string,
    is_staff: boolean,
}

interface professionalProps {
    id: string,
    first_name: string,
}

interface paymentProps {
    payment_id: string,
    name: string,
}

interface newScheduleProps {
    appdate: string,
    apphour: string,
    client: string,
    professional: string,
    status: string
    procedure: string,
    payment: string,
}

interface testeProps {
    professional: professionalProps,
    date: string,

}


const ScheduleClient: React.FC = () => {
    const history = useHistory();
    const { user } = useAuth();
    const { id }: any = useParams();
    const [status, setStatus] = useState<statusProps[]>([]);
    const [procedures, setProcedures] = useState<procedureProps[]>([]);
    const [professionals, setProfessionals] = useState<professionalProps[]>([]);
    const [payments, setPayments] = useState<paymentProps[]>([]);
    const [freeschedule, setFreeschedule] = useState<testeProps[]>([]);

    const [appdate, setAppdate] = useState('');
    const [apphour, setApphour] = useState('');
    const [statu, setStatu] = useState('');
    const [procedure, setProcedure] = useState('');
    const [professional, setProfessional] = useState('');
    const [payment, setPayment] = useState('');
    const [dates, setDates] = React.useState(moment());
    const { addToast } = useToast();

    useEffect(() => {
        api.get('/procedure/').then((response) => {
            setProcedures(response.data);
            console.log('procedimento', response.data);
        })
    }, [setProcedures]);

    useEffect(() => {
        api.get('/getprof/').then((response) => {
            setProfessionals(response.data);
            console.log('profissional', response.data);
        })
    }, [setProfessionals]);

    useEffect(() => {
        api.get('/payment/').then((response) => {
            setPayments(response.data);
            console.log('pagamento', response.data);
        })
    }, [setPayments]);

    useEffect(() => {
        api.post('/freeschedule/', handlerDates()).then((response: any) => {
            setFreeschedule(response.data);
        });
    }, [dates, professional]);

    function handlerDates() {
        const fd = new FormData()
        fd.append("professional", professional)
        fd.append("date", dates.format('DD/MM/YYYY'))
        return fd;
    }
  
    async function handlerSubmit(){
        await api.post('/appointment/', handlerSchedule());
        addToast({
            type: 'success',
            title: 'Horário agendado com sucesso!',
        });
        history.push('/dashboard_cliente/')
    }


    function handlerSchedule(){
        const fd = new FormData()
        fd.append("appdate", dates.format('DD/MM/YYYY'))
        fd.append("apphour", apphour)
        fd.append("status", '156')
        fd.append("procedure", procedure)
        fd.append("client", user.id.toString())
        fd.append("professional", professional)
        fd.append("payment", payment)
        return fd;
    }
    return (
        <Container>
            <Content>
                <h1>Novo agendamento</h1>

                <select name="procedure" onChange={e => { setProcedure(e.target.value) }}>
                    <option value="">Selecione um procedimento</option>
                    {procedures.map((procedures) => (
                        <option key={procedures.procedure_id} value={procedures.procedure_id}>{procedures.name}</option>
                    ))}
                </select>

                <select name="professional" onChange={e => { setProfessional(e.target.value) }}>
                    <option value="">Selecione um profissional</option>
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

                <select name="apphour" onChange={e => { setApphour(e.target.value) }}>
                    <option value="">Selecione um horário</option>
                    {freeschedule.map((freeschedule: any) => (
                        <option key={freeschedule.id} value={freeschedule.apphour}>{freeschedule.apphour}</option>
                    ))}
                </select>

                <select name="payment" onChange={e => { setPayment(e.target.value) }}>
                    <option value="">Forma de pagamento</option>
                    {payments.map((payments) => (
                        <option key={payments.payment_id} value={payments.payment_id}>{payments.name}</option>
                    ))}
                </select>
       
                <button onClick={e => (handlerSubmit())} type="submit" >Enviar</button>
                <Links>
                    <Link to="/dashboard">
                    <FiArrowLeft/>
                        Voltar
                    </Link>
                </Links>
            </Content>
        </Container>
    )

}
export default ScheduleClient;