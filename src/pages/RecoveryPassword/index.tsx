import React, { useCallback, useRef } from 'react';
import { Container, Content, AnimationContainer } from './style';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth'
import { useToast} from '../../hooks/toast'
import { title } from 'process';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//import api from '../../services/api';
// import { FiMail, FiLock } from 'react-icons/fi';

interface RecoveryData{
    CPF: string,
    email: string,
}

const RecoveryPass: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { addToast } = useToast();

    const handlerSubmit = useCallback (async (data: RecoveryData) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                CPF: Yup.string().required('Digite seu C.P.F.'),
                email: Yup.string().email('Digite um e-mail válido.'),
                
            });


            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/passrecover/', data);
            addToast({
                type: 'success',
                title: 'Nova senha enviada!',
                description: 'Verifique sua caixa de e-mail.' 
            })

            history.push('/');

        }catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors( errors );

                return;
            }
            addToast({
                type: 'error',
                title: 'Erro de envio',
                description: 'Ocorreu um erro ao enviar o e-mail, tente novamente.',
            });
        }
    }, [addToast] );
    return(
         <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef }  onSubmit={handlerSubmit}>
                        <h1>Recuperação de senha</h1>
                        <Input type="text" placeholder="CPF " name="CPF" mask="cpf"/>
                
                        <Input type="text" placeholder="E-mail " name="email"/>

                        <Button type="submit">Enviar</Button>

                    </Form>
                    <Link to="/procedimentos">
                        <FiArrowLeft/>
                        Voltar
                    </Link>
                </AnimationContainer>
            </Content>
        
        </Container>
    );
}

export default RecoveryPass;