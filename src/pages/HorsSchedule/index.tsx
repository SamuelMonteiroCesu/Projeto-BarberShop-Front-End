import React, { useCallback, useRef, useState } from 'react';
import {Container, Content, AnimationContainer} from './style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import * as Yup from 'yup'; 
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface scheduleProps{
    id: string,
    begin: string,
    end: string,
    interval: string,
    weekDay: string
}

const HorsSchedule: React.FC = () =>{

    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { addToast } = useToast();
    const {user} = useAuth();

    const handlerSubmit = useCallback (async (data: scheduleProps) => {
        try{
            
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                begin: Yup.string().required('Informe o horário de início'),
                end: Yup.string().required('Informe o horário de término.'),
                interval: Yup.string().required('Informe o tempo de intervalo'),
                weekDay: Yup.string().required('Informe o dia da semana'),
            });
            
            await api.post('/schedule/', data);
               addToast({
                type: 'success',
                title: 'cadastro realizado!',
                description: 'Nova agenda cadastrado com sucesso!',
            });
            history.push('/dashboard');

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
                <AnimationContainer>
                    <Form 
                    initialData={{professional: user.id}}
                    ref={ formRef } 
                    onSubmit={handlerSubmit}>
                        <h1>Cadastro de agenda</h1>
                        <Input type="text" name="professional" placeholder="ID"/>
                        <Input type="text" name="begin" placeholder="Inicio" mask="hours"/>
                        <Input type="text" name="end" placeholder="Término" mask="hours"/>
                        <Input type="text" name="interval" placeholder="Minutos de intervalo" />
                        <Input type="text" name="weekday" placeholder="Dia da semana"/>
                        <Button type="submit">Enviar</Button>
                    </Form>
                        <Link to="/dashboard">
                            <FiArrowLeft/>
                            Voltar
                        </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
}


export default HorsSchedule;