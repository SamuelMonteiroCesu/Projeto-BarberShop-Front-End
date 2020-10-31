import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup'; 
import { Container, Content } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

const ManagementEmployee: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
    const handlerSubmit = useCallback (async (data: object) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                doc: Yup.string().required('Informe o CPF do profissional.').min(11, 'Digite um CPF válido.'),
                name: Yup.string().required('Informe o nome do profissional.'),
                email: Yup.string().required('Informe o E-mail do profissional.').email('Digite um E-mail válido.'),
                password: Yup.string().min(6, 'No mínimo 6 caracteres.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            api.post('/employee/', data);

        }catch(err){
            
            const errors = getValidationErrors(err);
            formRef.current?.setErrors( errors );
        }
    }, [] );

    return(
        <Container>
        <Content>
            <Form ref={ formRef } onSubmit={ handlerSubmit }>
                <h1>Olá</h1>
                
                <Input type="text" placeholder="CPF " name="doc"/>

                <Input type="text" placeholder="Nome " name="name"/>

                <Input type="text" placeholder="Telefone " name="phone"/>

                <Input type="text" placeholder="Celular " name="cellphone"/>

                <Input type="text" placeholder="E-mail " name="email"/>

                <Input type="password" placeholder="Senha" name="password"/>

                <Input type="text" placeholder="obs" name="obs"/>

                <Button type="submit">Enviar</Button>
            </Form>
        </Content>
        </Container>
    );
};
   


export default ManagementEmployee;