import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Links, Lists } from './style';
//import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';

interface clientProps{
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
}


const ListClient: React.FC = () =>{

    const [client, setClient ] = useState<clientProps[]>([]);
    const history = useHistory(); 
    const { addToast } = useToast();
    
    useEffect(() =>{
        api.get('/client').then((response) =>{
            console.log('profissionais', response.data);
        })
        loadEmployee()
    },[])

    async function loadEmployee() {
        const response = await api.get('/client')
        //console.log('esse', response)
        setClient(response.data)
    }

    function newEmployee(){
        history.push('cadastro_cliente');
    }

    // function editEmployee(id: string){
    //     history.push(`/cadastro_funcionarios/${id}`);
    // }

    // async function deleteEmployee(id: string){
    //     await api.delete(`/employee/${id}`);
    //     addToast({
    //         type: 'info',
    //         title: 'Procedimento deletado!',
    //     });
    //     loadEmployee();
    // }

    return(
        <Lists>
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="task-header">
                    <h1>Clientes</h1>
                    <Button variant="success" size="sm" onClick={newEmployee}>Novo cliente</Button>
                </div>
                <br/>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Aniversário</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    client.map((client)=>(
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.first_name}</td>
                            <td>{client.email}</td>
                            <td>{client.last_name}</td>
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
};

export default ListClient;