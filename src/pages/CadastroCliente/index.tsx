import React, { useCallback, useRef } from 'react';
import { Container, Content } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { FiMail, FiLock } from 'react-icons/fi';

const CadastroCliente: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const handlerSubmit = useCallback (async (data: object) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                cpf: Yup.string().required('CPF obrigatório.').min(11, 'Digite um CPF válido.'),
                name: Yup.string().required('Nome obrigatório.'),
                birthday: Yup.string().required('Data de nascimento obrigatório.'),
                email: Yup.string().required('E-mail obrigatório.').email('Digite um E-mail válido.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

        }catch(err){
            
            const errors = getValidationErrors(err);
            formRef.current?.setErrors( errors );
        }
    }, [] );
    return(
        <Container>
        <Content>
            <Form ref={ formRef } onSubmit={handlerSubmit}>

                <h1>Em andamento...</h1>
            
                    <Input type="text" placeholder="CPF " name="cpf"/>
        
                    <Input type="text" placeholder="Nome " name="name"/>
            
                    <Input type="text" placeholder="Data de nascimento " name="birthday"/>
            
                    <Input type="text" placeholder="E-mail " name="email"/>
        
                    <Input type="text" placeholder="Celular " name="cellphone"/>

                    <Button type="submit">Enviar</Button>
            </Form>
        </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default CadastroCliente;