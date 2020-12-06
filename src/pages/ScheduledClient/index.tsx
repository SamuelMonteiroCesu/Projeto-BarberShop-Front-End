import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Container, Content } from './style';
import { Link, useHistory, useParams} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import { constrainPoint } from '@fullcalendar/react';
import { useAuth } from '../../hooks/auth';

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
    client: string,
    professional: string,
    status: string
    procedure: string,
    payment: string,
}

const ScheduleClient: React.FC = () =>{

    const { user } = useAuth();
    const [status, setStatus] = useState<statusProps[]>([]);
    const [procedure, setProcedure] = useState<procedureProps[]>([]);
    const [client, setClient] = useState<clientProps[]>([]);
    const [professionals, setProfessional] = useState<professionalProps[]>([]);
    const [payment, setPayments] = useState<paymentProps[]>([]);

    useEffect(() =>{
        api.get('/status/').then((response) =>{
            setStatus(response.data);
            console.log('status', response.data);
        })
    }, [setStatus])

    useEffect(() =>{
        api.get('/procedure/').then((response) =>{
            setProcedure(response.data);
            //console.log('procedimento', response.data);
        })
        }, [setProcedure]);

    useEffect(() =>{
        api.get('/client/').then((response)=>{
                setClient(response.data);
                //console.log('cliente', response.data)
        })
    }, [setClient])

    useEffect(() =>{
        api.get('/getprof/').then((response) =>{
            setProfessional(response.data);
            //console.log('profissional', response.data);
        })
    }, [setProfessional]);

    useEffect(() =>{
        api.get('/payment/').then((response)=>{
            setPayments(response.data);
            // console.log('pagamento', response.data);
        })
    }, [setClient]);

    const handlerSubmit = useCallback (async (data: newScheduleProps) => {
        await api.post('/appointment/', data)
    }, [])
    return(
        <Container>
            <Content>
                <h1>ESSE É CLIENTE</h1>
                <Form onSubmit={handlerSubmit} initialData={{client: user.first_name}}>
                    <Input type="text" name="client"/>
                    <Input type="text" name="appdate" placeholder="DD/MM/AAAA"/>
                    <Input type="text" name="apphour" placeholder="HORA"/>
                    <Input type="text" name="status" placeholder="status"/>
                    <Input type="text" name="procedure" placeholder="procedure"/>
                    <Input type="text" name="professional" placeholder="professional"/>
                    <Input type="text" name="payment" placeholder="pagamento"/>
                    {/* <select name="status">
                    {status.map((status) =>(
                            <option key={status.status_id}>{status.status_id}</option>
                    ))}
                    </select>

                    <select name="procedure">
                        {procedure.map((procedure) =>(
                            <option key={procedure.procedure_id}>{procedure.procedure_id}</option>
                        ))}
                    </select>

                    <select name="client">
                        {client.map((client) =>(
                            <option key={client.id}>{client.id}</option>
                        ))}
                    </select>

                    <select name="professional">
                        {professionals.map((professional) =>(
                            <option key={professional.id}>{professional.id}</option>
                        ))}
                    </select>

                    <select name="payment">
                        {payment.map((payment) =>(
                            <option key={payment.payment_id}>{payment.payment_id}</option>
                        ))}
                    </select>  */}

                    <button type="submit">Enviar</button>
                </Form>
            </Content>
        </Container>
    )

}
export default ScheduleClient;