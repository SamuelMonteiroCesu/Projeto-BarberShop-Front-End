import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup'; 
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, Content, AnimationContainer } from './style';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface EmployeeProps{
    eployee_id: string,
    name: string,
    birthday: string,
    doc: string,
    email: string,
} 

const ManagementEmployee: React.FC = () =>{

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const handlerSubmit = useCallback (async (data: EmployeeProps) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                doc: Yup.string().required('Informe o CPF do profissional.').min(11, 'Digite um CPF válido.'),
                name: Yup.string().required('Informe o nome do profissional.').min(3, 'No mínimo três caracteres'),
                email: Yup.string().required('Informe o E-mail do profissional.').email('Digite um E-mail válido.'),
                password: Yup.string().min(6, 'No mínimo 6 caracteres.'),
                passwordConfirmation: Yup.string().required('Confirmação de senha obrigatória.')
                                        .oneOf([Yup.ref('password')], 'Senhas não correspondentes')
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            await api.post('/client/', data);
            history.push('/');

        }catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors( errors );
    
                return;
            }
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
            });
        }
    }, [addToast, ] );

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef } onSubmit={ handlerSubmit }>
                        <h3>Cadastro de Funcionário</h3>
                        
                        <Input type="text" placeholder="CPF " name="doc" mask="cpf"/>

                        <Input type="text" placeholder="Nome " name="name"/>

                        <Input type="text" placeholder="E-mail " name="email"/>

                        <Input type="text" placeholder="Data de nascimento " name="birthday" mask="datas"/>

                        <Input type="password" placeholder="Senha" name="password"/>

                        <Input type="password" placeholder="Confirmar senha" name="passwordConfirmation"/>

                        <Button type="submit">Enviar</Button>
                    </Form>
                </AnimationContainer>
            </Content>
        </Container>
    );
};
   


export default ManagementEmployee;