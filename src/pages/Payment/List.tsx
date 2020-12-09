import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Links } from './style';
//import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/esm/Button';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';
import { Lists } from '../Procedure/style';

interface ProceduresProps {
    payment_id: string,
    name: string,
    discount: string,
    tax: string,
}


const ListPayment: React.FC = () => {

    const [payments, setPayments] = useState<ProceduresProps[]>([]);
    const history = useHistory();
    const { addToast } = useToast();

    useEffect(() => {
        loadPayment();
    }, []);

    async function loadPayment() {
        const response = await api.get('/payment')
        setPayments(response.data)
    }

    function newPayment() {
        history.push('cadastro_pagamento');
    }

    function editPayment(payment_id: string) {
        history.push(`/cadastro_pagamento/${payment_id}`);
    }

    async function deleteProcedure(payment_id: string) {
        await api.delete(`/payment/${payment_id}`);
        addToast({
            type: 'info',
            title: 'Forma de pagamento deletado!'
        })
        loadPayment();
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <Lists>
                <div className="container">
                    <div className="task-header">
                        <h1>Formas de pagamento</h1>
                        <Button variant="success" size="sm" onClick={newPayment}>Novo Pagamento</Button>
                    </div>
                    <br />
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Forma</th>
                                <th>Desconto</th>
                                <th>Taxa</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment) => (
                                    <tr key={payment.payment_id}>
                                        <td>{payment.name}</td>
                                        <td>{payment.discount}</td>
                                        <td>{payment.tax}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="info"
                                                onClick={() => editPayment(payment.payment_id)}>Editar
                                </Button>{' '}
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => deleteProcedure(payment.payment_id)}>Remover
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
        </div>
    );
};

export default ListPayment;