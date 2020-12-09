import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Content } from './style';
import { Link, useParams, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {useToast} from '../../hooks/toast';
// import userEvent from '@testing-library/user-event';
// import { Form } from '@unform/web';
// import Input from '../../components/Input';
// import { constrainPoint } from '@fullcalendar/react';

interface statusProps{
    status_id: string,
    name: string,
}

interface procedureProps{
    procedure_id: string,
    name: string,
}

interface clientProps{
    id: string,
    first_name: string,
    is_staff: boolean,
}

interface professionalProps{
    id: string,
    first_name: string,
}

interface paymentProps{
    payment_id: string,
    name: string,
}

interface newScheduleProps{
    appdate: string,
    apphour: string,
    client: clientProps,
    professional: professionalProps,
    status: statusProps,
    procedure: procedureProps,
    payment: paymentProps,
    active: boolean,
}


const ScheduleProfessional: React.FC = () =>{

    const history = useHistory();
    const { id }: any = useParams();
    const { addToast } = useToast();
    const [status, setStatus] = useState<statusProps[]>([]);
    const [procedures, setProcedures] = useState<procedureProps[]>([]);
    const [clients, setClients] = useState<clientProps[]>([]);
    const [professionals, setProfessionals] = useState<professionalProps[]>([]);
    const [payments, setPayments] = useState<paymentProps[]>([]);

    const [appdate, setAppdate] = useState('');
    const [apphour, setApphour] = useState('');
    const [statu, setStatu] = useState('');
    const [procedure, setProcedure] = useState('');
    const [client, setClient] = useState('');
    const [professional, setProfessional] = useState('');
    const [payment, setPayment] = useState('');

    useEffect(() =>{
        api.get('/status/').then((response) =>{
            setStatus(response.data);
            //console.log('status', recebe);
        })
    }, [setStatus])

    

    useEffect(() =>{
        api.get('/procedure/').then((response) =>{
            setProcedures(response.data);
            //console.log('procedimento', response.data);
        })
        }, [setProcedures]);

    useEffect(() =>{
        api.get('/client/').then((response)=>{
                setClients(response.data);
                //console.log('cliente', response.data)
        })
    }, [setClients])

    useEffect(() =>{
        api.get('/getprof/').then((response) =>{
            setProfessionals(response.data);
            //console.log('profissional', response.data);
        })
    }, [setProfessionals]);

    useEffect(() =>{
        api.get('/payment/').then((response)=>{
            setPayments(response.data);
            // console.log('pagamento', response.data);
        })
    }, [setPayments]);

    async function handlerSubmit(){
        // const data = handlerSchedule()
        // alert(data.toString());
        if(id  !== undefined){
            await api.patch(`/appointment/${id}/`, handlerSchedule());
            addToast({
                type: 'success',
                title: 'Agendamento atualizado com sucesso!',
            });
        }else{
            await api.post('/appointment/', handlerSchedule());
            addToast({
                type: 'success',
                title: 'Cliente agendado com sucesso!',
            });
            history.push('')
        }   
        
    }


    function handlerSchedule(){
        const fd = new FormData()
        fd.append("appdate", appdate)
        fd.append("apphour", apphour)
        fd.append("status", statu)
        fd.append("procedure", procedure)
        fd.append("client", client)
        fd.append("professional", professional)
        fd.append("payment", payment)
        return fd;
    }
   
    useEffect(() => {
        if (!id) {
            setAppdate(sessionStorage.getItem('appdate') || '');
            setApphour(sessionStorage.getItem('apphour') || '');
        }else{
            api.get(`/appointment/${id}/`).then((response) => {
                setAppdate(sessionStorage.getItem('appdate') || '');
                setApphour(sessionStorage.getItem('apphour') || '');
                // alert(JSON.stringify(response.data));
                const { status, procedure, client, professional, payment } = response.data;
                setProcedure(procedure.procedure_id);
                setStatu(status.status_id);
                setClient(client.id);
                setProfessional(professional.id);
                setPayment(payment.payment_id);

            })
        }
    }, ['loading'])

    return(
        <Container>
            <Content>
                <h1>Agende um cliente</h1>
                    <input 
                        type="text" 
                        value={appdate} 
                        onChange={e => {setAppdate(e.target.value)}} 
                        name="appdate" placeholder="DD/MM/AAAA" />
                    <input 
                        type="text" 
                        value={apphour} 
                        onChange={e => {setApphour(e.target.value)}} 
                        name="apphour" 
                        placeholder="HORA" />
                    
                    <select name="status" onChange={e => {setStatu(e.target.value)}} value={statu}>
                    <option>Selecione um status</option>
                    {status.map((status) =>(
                            <option key={status.status_id} value={status.status_id}>{status.name}</option>
                    ))}
                    </select>

                    <select name="procedure" onChange={e => {setProcedure(e.target.value)}} value={procedure}>
                        <option value="">Selecione um procedimento</option>
                        {procedures.map((procedures) =>(
                            <option key={procedures.procedure_id} value={procedures.procedure_id}>{procedures.name}</option>
                        ))}
                    </select>

                    <select name="client" onChange={e => {setClient(e.target.value)}} value={client}>
                        <option value="">Selecione um cliente</option>
                        {clients.map((clients) =>(
                            <option key={clients.id} value={clients.id}>{clients.first_name}</option>
                        ))}
                    </select>

                    <select name="professional" onChange={e => {setProfessional(e.target.value)}} value={professional}>
                        <option value="">Selecione um profissional</option>
                        {professionals.map((professionals) =>(
                            <option key={professionals.id} value={professionals.id}>{professionals.first_name}</option>
                        ))}
                    </select>

                    <select name="payment"  onChange={e => {setPayment(e.target.value)}} value={payment}>
                        <option value="">Forma de pagamento</option>
                        {payments.map((payments) =>(
                            <option key={payments.payment_id} value={payments.payment_id}>{payments.name}</option>
                        ))}
                    </select> 

                    <button onClick={e => (handlerSubmit())} type="submit">Enviar</button>
                    <Link to="/agendados/">
                        <FiArrowLeft/>
                        Voltar
                    </Link>
            </Content>
        </Container>
    )

}
export default ScheduleProfessional;