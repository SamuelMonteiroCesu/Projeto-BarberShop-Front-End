import React, { useCallback, useRef, Component, useEffect, useState } from 'react';
import * as Yup from 'yup'; 
import { Container, Content, AnimationContainer } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import {} from '../../hooks/auth';


interface StatusProps{
    status_id: string,
    name: string,
    active: string,
}

const CadastroStatus: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    
    const handlerSubmit = useCallback (async (data: object) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                name: Yup.string().required().min(3, 'No mínimo três caracteres.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            await api.post('/status/', data);
            history.push('/status');

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso!',
                description: 'Novo Status pronto.',
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

    const [statu, setStatus]= useState<StatusProps[]>([]);

        useEffect(() =>{
            api.get('/status/').then(response =>{
                setStatus(response.data);
        })
    
    }, []);

    // const handlerUpdate = (name:StatusProps['name'], id: StatusProps['status_id']) =>{
    //     api.put('/status/', statu)
    //     .then((statu =>{
    //         console.log(statu);
    //     }))
    //     .catch((err)=>{
    //         console.log(err);
    //     })
       //setStatus(prev => prev.map(statu => statu.status_id === id ? {...statu, name} : statu))
    //}

    const handlerDelete = (id: StatusProps['status_id']) =>{
        //api.delete('/status/1', statu.status_id)
        //setStatus(prev => prev.filter(statu => statu.status_id !== id))
    }
    return(
        <Container>
        <Content>
            <AnimationContainer>
            <Form ref={ formRef } onSubmit={ handlerSubmit }>
                <h1>Olá</h1>
                <Input type="text" name="name" placeholder="Status"/>
                <Button type="submit">Enviar</Button>
            </Form>
                {statu.map((status)=>(
                    <div key={status.status_id}>
                        <p>{status.status_id} {status.name} </p>
                        {/* <button type="button" onClick={() => handlerUpdate}>botão</button> */}
                          {/* onChange={e => handlerSubmit(e.current.Target.name, status.status_id) } */}
                    </div>
                ))}
            </AnimationContainer>
        </Content>
        </Container>
    );
};
   


export default CadastroStatus;