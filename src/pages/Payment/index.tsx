import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Container, Content, AnimationContainer } from './style';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/toast';

interface PaymentProps{
    name: string,
    discount: string,
    tax: string,
}

const ManagementPayment: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const { payment_id } = useParams();
    const [ payments, setPayments] = useState<PaymentProps>();
    useEffect(() =>{
        if(payment_id !== undefined){
            console.log(findPayment(payment_id));
        }     
    }, [payment_id]);
    
    async function findPayment(payment_id: string){
        const response = await api.get(`payment/${payment_id}`);
        setPayments(response.data);
        console.log('função', response)
    }

    const handlerSubmit = useCallback (async (data: PaymentProps) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            console.log(data);
            if(payment_id !== undefined){
                await api.put(`/payment/${payment_id}/`, data);
                addToast({
                    type: 'success',
                    title: 'Forma de pagamento atualizado!',
                });
            }else{
                await api.post('/payment/', data);  
                addToast({
                    type: 'success',
                    title: 'Nova forma de pagamento cadastrado!',
                });
            }
            history.push('/pagamentos');

            

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
            <Form 
            ref={ formRef }  
            onSubmit={handlerSubmit}
            initialData={{
                name: payments?.name,
                discount: payments?.discount,
                tax: payments?.tax,
                }}
            >
                <h3>Cadastro de Formas de pagamentos</h3>
                    <Input type="text" placeholder="Forma" name="name"/>
            
                    <Input type="text" placeholder="Desconto" name="discount" mask="currency"/>
        
                    <Input type="text" placeholder="Taxa" name="tax" mask="currency"/>

                    <Button type="submit">Enviar</Button>
            </Form>
            <Link to="/pagamentos">
                Voltar
            </Link>
            </AnimationContainer>
        </Content>
        {/* <Background /> */}
        </Container>
    );
}

export default ManagementPayment;