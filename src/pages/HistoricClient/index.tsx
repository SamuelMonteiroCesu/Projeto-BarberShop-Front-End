import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Container } from './style';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';


const HistoricClient: React.FC = () =>{

    const [appointments, setAppointments] = useState([]);

    useEffect(() =>{
        api.get('/appointment/').then((response) =>{
            setAppointments(response.data);
            console.log(response.data);
        })
    }, [setAppointments]);

    return (
        <Container>
            <h1>HISTORICO DO CLIENTE</h1>
            <div className="container">
                <div className="task-header">
                    <h1>Procedimentos</h1>
                
                </div>
                <br/>
                {/* <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Procedimento</th>
                        <th>Tempo estimado</th>
                        <th>Preço</th>
                        <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    appointments.map((appointments)=>(
                        <tr key={appointments.procedure_id}>
                            <td>{procedure.name}</td>
                            <td>{procedure.time}</td>
                            <td>{procedure.price}</td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody> 
                </Table>
                <Links>
                    <Link to="/dashboard">
                    <FiArrowLeft/>
                        Voltar
                    </Link>
                </Links> */}
            </div>
        </Container>
    )
}

export default HistoricClient;