import React, { useCallback, useRef } from 'react';
import { Container, Content } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { FiMail, FiLock } from 'react-icons/fi';

const ManagementPayment: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    
    const handlerSubmit = useCallback (async (data: object) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            
            api.post('/payment/', data);

        }catch(err){
            
            const errors = getValidationErrors(err);
            formRef.current?.setErrors( errors );
        }
    }, [] );
    return(
        <Container>
        <Content>
            <Form ref={ formRef }  onSubmit={handlerSubmit}>

                <h1>Em andamento...</h1>

                    <Input type="text" placeholder="Forma" name="name"/>
            
                    <Input type="text" placeholder="Desconto" name="discount"/>
        
                    <Input type="text" placeholder="Taxa" name="tax"/>

                    <Button type="submit">Enviar</Button>
            </Form>
        </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default ManagementPayment;