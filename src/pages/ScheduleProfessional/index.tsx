import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Container, Content } from './style';
import { Link, useHistory, useParams} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import { constrainPoint } from '@fullcalendar/react';

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


const ScheduleProfessional: React.FC = () =>{

    const { id }: any = useParams();

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
            console.log('status', response.data);
        })
    }, [setStatus])

    useEffect(() =>{
        api.get('/procedure/').then((response) =>{
            setProcedures(response.data);
            console.log('procedimento', response.data);
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
            console.log('profissional', response.data);
        })
    }, [setProfessionals]);

    useEffect(() =>{
        api.get('/payment/').then((response)=>{
            setPayments(response.data);
            // console.log('pagamento', response.data);
        })
    }, [setPayments]);

    // const handlerSubmit = useCallback (async () => {

    async function handlerSubmit(){
        const data = handlerSchedule()
        alert(data.toString());
        await api.post('/appointment/', handlerSchedule());
        
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
        // return {
        //     appdate,
        //     apphour,
        //     status:statu,
        //     procedure,
        //     client,
        //     professional,
        //     payment,
        // }
    }
   
    useEffect(() =>{
        if(id === null){
            setAppdate(sessionStorage.getItem('appdate') || 'aleatorio');
            setApphour(sessionStorage.getItem('apphour') || '');
        }else{
            api.get(`/appointment/${id}/`).then((response) =>{
            
                alert(JSON.stringify(response.data));
            })
        }
        //sessionStorage.clear();
    }, ['loading'])


    return(
        <Container>
            <Content>
                <h1>OLA</h1>
                {/* <form> */}
                    <input type="text" value={appdate} onChange={e => {setAppdate(e.target.value)}} name="appdate" placeholder="DD/MM/AAAA" />
                    <input type="text" value={apphour} onChange={e => {setApphour(e.target.value)}} name="apphour" placeholder="HORA" />
                    {/* <Input type="text" name="status" placeholder="status"/>
                    <Input type="text" name="procedure" placeholder="procedure"/>
                    <Input type="text" name="client" placeholder="client"/>
                    <Input type="text" name="professional" placeholder="professional"/>
                    <Input type="text" name="payment" placeholder="pagamento"/> */}

                    <select name="status" onChange={e => {setStatu(e.target.value)}}>
                    {status.map((status) =>(
                            <option key={status.status_id} value={status.status_id}>{status.name}</option>
                    ))}
                    </select>

                    <select name="procedure" onChange={e => {setProcedure(e.target.value)}}>
                        {procedures.map((procedures) =>(
                            <option key={procedures.procedure_id} value={procedures.procedure_id}>{procedures.name}</option>
                        ))}
                    </select>

                    <select name="client" onChange={e => {setClient(e.target.value)}}>
                        {clients.map((clients) =>(
                            <option key={clients.id} value={clients.id}>{clients.first_name}</option>
                        ))}
                    </select>

                    <select name="professional" onChange={e => {setProfessional(e.target.value)}}>
                        {professionals.map((professionals) =>(
                            <option key={professionals.id} value={professionals.id}>{professionals.first_name}</option>
                        ))}
                    </select>

                    <select name="payment"  onChange={e => {setPayment(e.target.value)}}>
                        {payments.map((payments) =>(
                            <option key={payments.payment_id} value={payments.payment_id}>{payments.name}</option>
                        ))}
                    </select> 

                    <button onClick={e => (handlerSubmit())} type="submit">Enviar</button>
                {/* </form> */}
            </Content>
        </Container>
    )

}
export default ScheduleProfessional;