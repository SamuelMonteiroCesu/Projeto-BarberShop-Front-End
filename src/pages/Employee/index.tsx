import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { Checkbox } from 'antd';
import { FiArrowLeft } from 'react-icons/fi';

interface EmployeeProps{
    id: string,
    first_name: string, //NOME
    last_name: string, // DATA DE NASCIMENTO
    username: string,  // CPF
    email: string,
    is_staff: string,
} 

const ManagementEmployee: React.FC = () =>{

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() =>{
        api.get('/client/').then((response) =>{
            console.log('CLIENTES', response.data);
        })
    }, [])
    const handlerSubmit = useCallback (async (data: EmployeeProps) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                username: Yup.string().required('Informe o CPF do profissional.').min(11, 'Digite um CPF válido.'),
                first_name: Yup.string().required('Informe o nome do profissional.').min(3, 'No mínimo três caracteres'),
                email: Yup.string().required('Informe o E-mail do profissional.').email('Digite um E-mail válido.'),
                // password: Yup.string().min(6, 'No mínimo 6 caracteres.'),
                // passwordConfirmation: Yup.string().required('Confirmação de senha obrigatória.')
                //                         .oneOf([Yup.ref('password')], 'Senhas não correspondentes')
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            await api.post('/client/', data);
            addToast({
                type: 'success',
                title: 'Sucesso!',
                description: 'Cadastro realizado com sucesso!'
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
    }, [addToast, ] );
    const [func, setFunc] = useState('');
    return(
        <Container>
            <Content>
                <AnimationContainer>
                
                    <Form ref={ formRef } onSubmit={ handlerSubmit }>
                        <h1>Cadastro de Profissional</h1>  
                    
                        <Input type="text" placeholder="CPF " name="username" mask="cpf"/>

                        <Input type="text" placeholder="Nome " name="first_name"/>

                        <Input type="text" placeholder="E-mail " name="email"/>

                        <Input type="text" placeholder="Data de nascimento " name="last_name" mask="datas"/>

                        <Input type="hidden" name="is_staff" value="1"/> 

                        <Button type="submit">Enviar</Button>

                        <Link to ="dashboard">
                            <FiArrowLeft/>
                            Voltar
                        </Link>
                        
                    </Form>
                </AnimationContainer>
            </Content>
        </Container>
    );
};
   


export default ManagementEmployee;