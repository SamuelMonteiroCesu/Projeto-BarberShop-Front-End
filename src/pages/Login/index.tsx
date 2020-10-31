import React, { useCallback, useRef } from 'react';
import { Container, Content } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

//import api from '../../services/api';
// import { FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext'

interface LoginFormData{
    username: string,
    password: string,
}

const Login: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    
    const { user, validateLogin } = useAuth();
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
            validateLogin({
                username: data.username,
                password: data.password,
            });
           // api.post('/client/', data);

        }catch(err){
            
            const errors = getValidationErrors(err);
            formRef.current?.setErrors( errors );
        }
    }, [validateLogin] );
    return(
        <Container>
        <Content>
            <Form ref={ formRef }  onSubmit={handlerSubmit}>

                <h1>Login</h1>

                    {/* <Input type="text" placeholder="fk " name="company_fk"/> */}
            
                    <Input type="text" placeholder="E-mail " name="username"/>
            
                    <Input type="password" placeholder="Senha " name="password"/>

                    <Button type="submit">Entrar</Button>
            </Form>
        </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default Login;