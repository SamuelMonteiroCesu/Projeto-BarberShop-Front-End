import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup'; 
import { Container, Content } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

const CadastroStatus: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
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
            api.post('/client/', data);
        }catch(err){
            
            const errors = getValidationErrors(err);
            formRef.current?.setErrors( errors );
        }
    }, [] );

    return(
        <Container>
        <Content>
            <Form ref={ formRef } onSubmit={ handlerSubmit }>
                <h1>Olá</h1>
                <Input type="text" name="name" placeholder="Status"/>
                <Button type="submit">Enviar</Button>
            </Form>
        </Content>
        </Container>
    );
};
   


export default CadastroStatus;