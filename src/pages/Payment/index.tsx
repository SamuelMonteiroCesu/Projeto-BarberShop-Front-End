import React, { useCallback, useRef } from 'react';
import { Container, Content, AnimationContainer } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';

const ManagementPayment: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    
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
            history.push('/dashboard');

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso!',
                description: 'Nova forma de pagamento pronta.',
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
    return(
        <Container>
        <Content>
            <AnimationContainer>
            <Form ref={ formRef }  onSubmit={handlerSubmit}>
                <h1>Formas de pagamentos</h1>
                    <Input type="text" placeholder="Forma" name="name"/>
            
                    <Input type="text" placeholder="Desconto" name="discount" mask="currency"/>
        
                    <Input type="text" placeholder="Taxa" name="tax" mask="currency"/>

                    <Button type="submit">Enviar</Button>
            </Form>
            </AnimationContainer>
        </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default ManagementPayment;