import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup'; 
import { Container, Content } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { Link, useHistory, useParams} from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import { FiArrowLeft } from 'react-icons/fi';

interface ProceduresProps{
    //procedure_id: string
    name: string,
    price: string,
    time: string,
}

const CadastroProcedimento: React.FC = () =>{
    const { procedure_id } = useParams();
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const [procedures, setProcedure]= useState<ProceduresProps>();


    useEffect(() =>{
        if(procedure_id !== undefined){
            console.log(findProcedure(procedure_id));
        }     
    }, [procedure_id]);
    
    async function findProcedure(procedure_id: string){
        const response = await api.get(`procedure/${procedure_id}`);
        setProcedure(response.data);
    }

    const handlerSubmit = useCallback (async (data: ProceduresProps) => {
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
            
           if(procedure_id !== undefined){
              await api.put(`/procedure/${procedure_id}/`, data);
              addToast({
                type: 'success',
                title: 'Procedimento Atualizado!',
            });
            }else{
               await api.post('/procedure/', data);
               addToast({
                type: 'success',
                title: 'Novo Procedimento cadastrado!',
            });
            }
            history.push('/procedimentos');

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
    function back(){
        history.goBack()
    }
    
    return(
        <Container>
        <Content>
                <Form 
                initialData={{
                    name: procedures?.name, 
                    time: procedures?.time,
                    price: procedures?.price,
                }} 
                ref={ formRef } 
                onSubmit={ handlerSubmit }>
                    <h3>Cadastro de Procedimentos</h3>
                    <Input type="text" name="name" placeholder="Nome" />
                    <Input type="text" name="time" placeholder="Tempo estimado"/>
                    <Input type="text" name="price" placeholder="Preço" mask="currency"/>
                    <Button type="submit">Enviar</Button>
                </Form>
                    
                <Link to="/procedimentos">
                    Voltar
                </Link>
        </Content>
        </Container>
    );
};
   


export default CadastroProcedimento;