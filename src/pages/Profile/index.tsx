import React, { useCallback, useRef, useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, Passwords } from './style';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import { BiLogOutCircle } from 'react-icons/bi';
import { useAuth } from '../../hooks/auth';
import { create } from 'domain';

interface registerClient{
    username: string,
    first_name: string,
    last_name: string,
    email: string,
}

interface PasswordsProps{
    newpassword: String,
    passwordConfirm: string,
}



const Profile: React.FC = () =>{
    const { user, updateUser } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handlerSubmit = useCallback (async (data: registerClient) => {

        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                username: Yup.string().required('CPF obrigatório.').min(11, 'Digite um CPF válido.'),
                first_name: Yup.string().required('Nome obrigatório.'),
                last_name: Yup.string().required('Data de nascimento obrigatório.'),
                email: Yup.string().required('E-mail obrigatório.').email('Digite um E-mail válido.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            
            await api.patch(`/client/${user.id}/`, data).then((response) =>{
                updateUser(response.data);
                addToast({
                    type: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    description: 'Você já pode efetuar seu login.',
                });
            });
            history.push('/dashboard/');

            
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
    }, [addToast, history, updateUser] );

    const handlerPassword = useCallback(async (newpassword) =>{
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                newpassword: Yup.string().min(6,'No mínimo 6 caracteres.'),
                passwordConfirm: Yup.string().required('Confirmação de senha obrigatória.')
                                        .oneOf([Yup.ref('newpassword')], 'Senhas não correspondentes')
            });

              await schema.validate(newpassword, {
                  abortEarly: false,
              });
            
            
            await api.post('/passchange/', newpassword);
                addToast({
                    type: 'success',
                    title: 'Senha alterada com sucesso!',
                });
            history.push('/dashboard/');
           
        }catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors( errors );
    
                return;
            }
            addToast({
                type: 'error',
                title: 'Erro ao cadastrar nova senha',
                description: 'Ocorreu um erro ao atualizar a senha, tente novamente.',
            });
        }
    }, [addToast, history] );

    function Back(){
        history.goBack();
    }
    
    return(
        <Container>
            <header>
                <div>
                    <button type="button" onClick={Back}>
                        <BiLogOutCircle/>
                    </button>
                 </div>
            </header>
            <Content>
                    <Form 
                    ref={ formRef }  
                    onSubmit={handlerSubmit} 
                    initialData={{
                        username: user.username,
                        first_name: user.first_name,
                        email: user.email,
                        last_name: user.last_name,
                    }}
                    >
                        <h1>Meu perfil</h1>
                        <Input type="text" placeholder="CPF " name="username" mask="cpf"/>
            
                        <Input type="text" placeholder="Nome " name="first_name"/>
                
                        <Input type="text" placeholder="Data de nascimento " name="last_name" mask="datas"/>
                
                        <Input type="text" placeholder="E-mail " name="email"/>

                        <Button type="submit">Confirmar mudanças</Button>
                    </Form>
            </Content>
            <Passwords>
                <Form  ref={ formRef } onSubmit={handlerPassword}>
                    <Input type="password" placeholder="Nova Senha" name="newpassword"/>

                    <Input type="password" placeholder="Confirmar Senha" name="passwordConfirm"/>

                    <Button type="submit">Confirmar nova senha</Button>
                </Form>
            </Passwords> 
        </Container>
    );
} 

export default Profile;