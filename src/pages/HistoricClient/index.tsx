import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container, Links } from './style';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

interface clientProps {
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

interface paymentsProps{
    payments_id: string,
    name: string,
}
interface procedureProps {
    procedure_id: string,
    name: string,
}

interface profeProps {
    id: number,
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    is_staff: Boolean,
}

interface statusProps{
    stauts_id: string,
    name: string,
}

interface SchedulesProps {
    id: string,
    appdate: string,
    apphour: string,
    client: clientProps,
    total: string,
    professional: profeProps,
    procedure: procedureProps,
    payments: paymentsProps,
    status: statusProps,
}

const HistoricClient: React.FC = () =>{

    const [appointments, setAppointments] = useState([]);

    const [model, setModel] = useState<SchedulesProps[]>([]);

    useEffect(() => {
        api.get('/appointment/').then((response) => {
            setModel(response.data);
        });
    }, []);


    function retorna(){
        return model.map((model) => {
            let { appdate, apphour, professional, client, payments, procedure, status } = model
            return (
                <tr key={professional.id}>
                    <td>{appdate}</td>
                    <td>{apphour}</td>
                    <td>{procedure.name}</td>
                    <td>{professional.first_name}</td>
                    <td>{status.name}</td>
                    {/* <td>{payments.name}</td> */}
                </tr>
            )
        })

    }

    return (
        <Container>
            <div className="container">
                <div className="task-header">
                <h1>Historico de agendamento</h1>
               
                <Links>
                    <Link to="/dashboard">
                    <FiArrowLeft/>
                        Voltar
                    </Link>
                </Links>
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Procedimento</th>
                        <th>Profissional</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        retorna()
                    }
                    </tbody> 
                </Table>
            </div>
        </Container>
    );
}

export default HistoricClient;