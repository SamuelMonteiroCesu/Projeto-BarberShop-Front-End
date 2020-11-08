import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup'; 
import { Container, Content } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';



const CadastroProcedimento: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handlerSubmit = useCallback (async (data: object) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                name: Yup.string().required('Informe o nome do Procedimento'),
                time: Yup.string().required('Informe o tempo estimado do procedimento.'),
                price: Yup.string().required('Informe o valor do procedimento'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            api.post('/procedure/', data);
            history.push('/listProcedure');

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso!',
                description: 'Você já pode efetuar seu login.',
            });
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
    }, [] );
    return(
        <Container>
        <Content>
                <Form ref={ formRef } onSubmit={ handlerSubmit }>
                    <h1>Cadastro de Procedimentos</h1>
                    <Input type="text" name="name" placeholder="Nome"/>
                    <Input type="text" name="time" placeholder="Tempo estimado" mask="hours"/>
                    <Input type="text" name="price" placeholder="Preço" mask="currency"/>
                    <Button type="submit">Enviar</Button>
                </Form>

                <Link to="listProcedure">
                    Voltar
                </Link>
        </Content>
        </Container>
    );
};
   


export default CadastroProcedimento;