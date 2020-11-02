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

//import api from '../../services/api';
// import { FiMail, FiLock } from 'react-icons/fi';

interface LoginFormData{
    username: string,
    password: string,
}

const Login: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    
    const { user, validateLogin } = useAuth();
    const { addToast } = useToast();

    console.log(user);

    const handlerSubmit = useCallback (async (data: LoginFormData) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                username: Yup.string().required('Digite seu e-mail.'),
                password: Yup.string().min(6, 'Senha inválida.'),
                
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            await validateLogin({
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
    }, [validateLogin, addToast] );
    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef }  onSubmit={handlerSubmit}>
                        <h1>Login Funcionario</h1>
                        <Input type="text" placeholder="C.P.F " name="username"/>
                
                        <Input type="password" placeholder="Senha " name="password"/>

                        <Button type="submit">Entrar</Button>

                    </Form>
                </AnimationContainer>
            </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default Login;