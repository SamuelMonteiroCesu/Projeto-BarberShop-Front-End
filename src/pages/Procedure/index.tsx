import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup'; 
import { Container, Content } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

const CadastroProcedimento: React.FC = () =>{
    const formRef = useRef<FormHandles>(null);
    const handlerSubmit = useCallback (async (data: object) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({

                name: Yup.string().required('Informe o nome do Procedimento'),
                time: Yup.string().required('Informe o tempo estimado do procedimento.'),
                price: Yup.string().required('Informe o valor do procedimento'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            api.post('/procedure/', data);

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
                <Input type="text" name="name" placeholder="Nome"/>
                <Input type="text" name="time" placeholder="Tempo estimado"/>
                <Input type="text" name="price" placeholder="Preço"/>
                <Button type="submit">Enviar</Button>
            </Form>
        </Content>
        </Container>
    );
};
   


export default CadastroProcedimento;