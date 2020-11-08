import React, { useCallback, useRef, useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, AnimationContainer } from './style';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';

interface registerClient{
    name: string,
    birthday: string,
    doc: string,
    email: string,
}

const CadastroCliente: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    //const [user, userState] = useState();
    const [cliente, setClient]= useState([]);
        useEffect(() =>{
            (async () =>{
            const { data } = await api.get('/client');
            setClient(data);
        })();
    
        }, []);
        
    const handlerSubmit = useCallback (async (data: registerClient) => {

        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                doc: Yup.string().required('CPF obrigatório.').min(11, 'Digite um CPF válido.'),
                name: Yup.string().required('Nome obrigatório.'),
                birthday: Yup.string().required('Data de nascimento obrigatório.'),
                email: Yup.string().required('E-mail obrigatório.').email('Digite um E-mail válido.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            
            await api.post('/client/', data);
            history.push('/client/');

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
    }, [addToast, history] );

    console.log('AQUI2', cliente);
    
    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef }  onSubmit={handlerSubmit}>
                        <h1>Em andamento...</h1>
                        <Input type="text" placeholder="CPF " name="doc" mask="cpf"/>
            
                        <Input type="text" placeholder="Nome " name="name"/>
                
                        <Input type="text" placeholder="Data de nascimento " name="birthday" mask="datas"/>
                
                        <Input type="text" placeholder="E-mail " name="email"/>
            
                        <Input type="text" placeholder="Celular " name="cellphone"/>

                        <Button type="submit">Enviar</Button>
                    </Form>
                    {/* <ul>
                        {cliente.map((client)=>(
                            <li key={client.last_name}> ({client.first_name}) </li>
                        ))}
                    </ul> */}
                    <Link to="/login">
                        <FiArrowLeft/>
                        Voltar
                    </Link>
                </AnimationContainer>
            </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default CadastroCliente;