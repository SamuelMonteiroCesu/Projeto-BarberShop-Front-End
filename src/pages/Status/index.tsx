import React, { useCallback, useRef, Component, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Container, Content, AnimationContainer } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { datas } from '../../components/Input/style';
import { FiArrowLeft } from 'react-icons/fi';

interface StatusProps {
    //status_id: number,
    name: string,
    active: string,
}

const CadastroStatus: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const { status_id }: any = useParams();
    const { user } = useAuth();

    const [model, setModel] = useState<StatusProps>();


    useEffect(() => {
        if (status_id !== undefined) {
            findStatus(status_id);
        }

    }, [status_id]);

    async function findStatus(status_id: string) {
        const response = await api.get(`status/${status_id}`);
        setModel(response.data);
    }

    const handlerSubmit = useCallback(async (data: StatusProps) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                name: Yup.string().required().min(3, 'No mínimo três caracteres.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            if (status_id !== undefined) {
                await api.patch(`/status/${status_id}/`, data);
                addToast({
                    type: 'success',
                    title: 'Status atualizado!',
                });
            } else {
                await api.post('/status/', data);
                addToast({
                    type: 'success',
                    title: 'Novo Status cadastrado!',
                });
            }
            history.push('/status');


        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
            });
        }
    }, []);

    return (
       
        <Container>
            <Content>
                <AnimationContainer>
                    <Form initialData={{ name: model?.name }} ref={formRef} onSubmit={handlerSubmit}>
                        <h1>Cadastro de Status</h1>
                        <Input type="text" name="name" placeholder="Status" />
                        <Button type="submit">Enviar</Button>
                    </Form>
                    <Link to="/status">
                        <FiArrowLeft />
                        Voltar
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );

};



export default CadastroStatus;