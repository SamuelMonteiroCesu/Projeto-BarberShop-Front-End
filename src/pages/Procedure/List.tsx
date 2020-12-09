import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Links, Lists } from './style';
//import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';

interface ProceduresProps {
    procedure_id: string,
    name: string,
    price: string,
    time: string,
    activate: string,
}


const ListProcedure: React.FC = () => {

    const [procedures, setProcedure] = useState<ProceduresProps[]>([]);
    const history = useHistory();
    const { addToast } = useToast();
    useEffect(() => {
        loadProcedure();
    }, []);

    async function loadProcedure() {
        const response = await api.get('/procedure')
        //console.log('esse', response)
        setProcedure(response.data)
    }

    function newProcedure() {
        history.push('cadastro_procedimento');
    }

    function editProcedure(procedure_id: string) {
        history.push(`/cadastro_procedimento/${procedure_id}`);
    }

    async function deleteProcedure(procedure_id: string) {
        await api.delete(`/procedure/${procedure_id}`);
        addToast({
            type: 'info',
            title: 'Procedimento deletado!',
        });
        loadProcedure();
    }

    return (
        <Lists>
            <br />
            <br />
            <br />

            <div className="container">
                <div className="task-header">
                    <h1>Procedimentos</h1>
                    <Button variant="success" size="sm" onClick={newProcedure}>Novo Procedimento</Button>
                </div>
                <br />
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
                            procedures.map((procedure) => (
                                <tr key={procedure.procedure_id}>
                                    <td>{procedure.name}</td>
                                    <td>{procedure.time}</td>
                                    <td>{procedure.price}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="info"
                                            onClick={() => editProcedure(procedure.procedure_id)}>Editar
                                </Button>{' '}
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => deleteProcedure(procedure.procedure_id)}>Remover
                                </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Links>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                        Voltar
                    </Link>
                </Links>
            </div>
        </Lists>
    );
};

export default ListProcedure;