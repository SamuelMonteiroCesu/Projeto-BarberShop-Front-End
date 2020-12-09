import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/esm/Table';
import api from '../../../services/api';
import { useHistory, Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import './style.css';
import { Links, Lists } from '../style';
import { useToast } from '../../../hooks/toast';
import { info } from 'console';
import { FiArrowLeft } from 'react-icons/fi';

interface StatusProps{
    status_id: string,
    name: string,
    active: boolean,
}

const ManageStatus: React.FC = () =>{

    const history = useHistory()
    const [statu, setStatus]= useState<StatusProps[]>([]);
    const { addToast } = useToast();
    useEffect(() =>{
        loadStatus();
        }, []);

    async function loadStatus() {
        const response = await api.get('/status/')
        //console.log('esse', response)
        setStatus(response.data)
    }

    function newStatus(){
        history.push('/cadastro_status/');
    }

    function editStatus(status_id: string){
        history.push(`/cadastro_status/${status_id}`);
    }

    async function deleteStatus(status_id: string){
        await api.delete(`/status/${status_id}`);
        addToast({
            type: 'info',
            title: 'Status deletado!', 
        });
        loadStatus();
    }

    return(
        <Lists>
        <br/>
        <br/>
        <br/>
        <div className="container">
            <div className="task-header">
                <h1>Status</h1>
                 <Button variant="success" size="sm" onClick={newStatus}>Novo Status</Button>
            </div>
            <br/>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Status</th>
                    <th>Nome</th>
                    <th>Ativo</th>
                    <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                {
                statu.map((status)=>(
                    <tr key={status.status_id}>
                        <td>{status.status_id}</td>
                        <td>{status.name}</td>
                        <td>{status.active}</td>
                        <td>
                            <Button 
                                size="sm" 
                                variant="info" 
                                onClick={() =>editStatus(status.status_id)}>Editar
                            </Button>{' '}
                            <Button 
                                size="sm" 
                                variant="danger" 
                                onClick={() => deleteStatus(status.status_id)}>Remover
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
        </Lists>
    );
}

export default ManageStatus;