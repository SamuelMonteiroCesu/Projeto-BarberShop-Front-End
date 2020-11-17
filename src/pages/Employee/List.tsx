import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Links } from './style';
//import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';

interface EmployeeProps{
    eployee_id: string,
    name: string,
    birthday: string,
    doc: string,
    email: string,
}


const ListEmployee: React.FC = () =>{

    const [employees, setEmployees ] = useState<EmployeeProps[]>([]);
    const history = useHistory(); 
    const { addToast } = useToast();
    useEffect(() =>{
        loadEmployee();
    }, []);

    async function loadEmployee() {
        const response = await api.get('/employee')
        //console.log('esse', response)
        setEmployees(response.data)
    }

    function newEmployee(){
        history.push('cadastro_funcionarios');
    }

    function editEmployee(employee_id: string){
        history.push(`/cadastro_funcionarios/${employee_id}`);
    }

    async function deleteEmployee(employee_id: string){
        await api.delete(`/employee/${employee_id}`);
        addToast({
            type: 'info',
            title: 'Procedimento deletado!',
        });
        loadEmployee();
    }

    return(
        <div>
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="task-header">
                    <h1>Procedimentos</h1>
                    <Button variant="success" size="sm" onClick={newEmployee}>Novo Procedimento</Button>
                </div>
                <br/>
                <Table striped bordered hover variant="dark">
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
                    employees.map((employee)=>(
                        <tr key={employee.eployee_id}>
                            <td>{employee.name}</td>
                            <td>{employee.birthday}</td>
                            <td>{employee.doc}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Button 
                                    size="sm" 
                                    variant="info" 
                                    onClick={() =>editEmployee(employee.eployee_id)}>Editar
                                </Button>{' '}
                                <Button 
                                    size="sm" 
                                    variant="danger" 
                                    onClick={() => deleteEmployee(employee.eployee_id)}>Remover
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
        </div>
    );
};

export default ListEmployee;