import React, { useCallback, useRef } from 'react';
import { Container, Content, AnimationContainer } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth'
import { useToast} from '../../hooks/toast'
import { Link } from 'react-router-dom';

//import api from '../../services/api';
// import { FiMail, FiLock } from 'react-icons/fi';

interface LoginFormData{
    username: string,
    password: string,
}

const Login: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    
   const { refresh, login } = useAuth();
    const { addToast } = useToast();

    const handlerSubmit = useCallback (async (data: LoginFormData) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                username: Yup.string().required('Digite seu CPF.'),
                password: Yup.string().min(6, 'Senha inválida.'),
                
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        login({
            username: data.username,
            password: data.password,
        });
        }catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors( errors );
            }
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
            });
        }
    }, [ login, addToast] );
    return(
         <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef }  onSubmit={handlerSubmit}>
                        <h1>Faça seu Login</h1>
                        <Input type="text" placeholder="CPF " name="username" mask="cpf"/>
                
                        <Input type="password" placeholder="Senha " name="password"/>

                        <Button type="submit">Entrar</Button>

                    </Form>
                    <Link to="recuperar_senha">
                        Esqueci minha senha
                    </Link>
                </AnimationContainer>
            </Content>
        
        </Container>
    );
}

export default Login;