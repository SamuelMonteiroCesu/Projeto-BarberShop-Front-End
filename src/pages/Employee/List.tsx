import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Links, Lists } from './style';
//import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';

interface EmployeeProps{
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
}


const ListEmployee: React.FC = () =>{

    const [employees, setEmployees ] = useState<EmployeeProps[]>([]);
    const history = useHistory(); 
    const { addToast } = useToast();
    
    useEffect(() =>{
        loadEmployee()
    },[])

    async function loadEmployee() {
        const response = await api.get('/getprof')
        //console.log('esse', response)
        setEmployees(response.data)
    }

    function newEmployee(){
        history.push('cadastro_funcionarios');
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
                    <h1>Profissionais</h1>
                    <Button variant="success" size="sm" onClick={newEmployee}>Novo profissional</Button>
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
                    employees.map((employee)=>(
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.last_name}</td>
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

export default ListEmployee;