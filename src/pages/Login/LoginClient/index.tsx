import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, AnimationContainer } from './style';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';

//import { useAuth } from '../../../hooks/auth'
import { useToast} from '../../../hooks/toast'

//import api from '../../services/api';
import { FiLogIn} from 'react-icons/fi';
import { useAuth } from '../../../hooks/auth';

interface LoginFormData{
    username: string,
    password: string,
}

const LoginClient: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    const { login } = useAuth();
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

            return;
        }
        addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
        }
    }, [ addToast] );
    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef }  onSubmit={handlerSubmit}>
                        <h1>Login Cliente</h1>
                        <Input type="text" placeholder="CPF " name="username" mask="cpf"/>
                
                        <Input type="text" placeholder="DD/MM/AAAA" name="password" mask="datas"/>

                        <Button type="submit">Entrar</Button>

                    </Form>

                    <Link to="cadastro">
                        <FiLogIn/>
                        Cadastrar-se
                    </Link>
                </AnimationContainer>
            </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default LoginClient;