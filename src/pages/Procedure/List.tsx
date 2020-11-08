import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Content, ListContainer } from './style';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

interface ProceduresProps{
    procedure_id: number,
    name: String,
    price: String,
    time: String,
    activate: String,
}

const ListProcedure: React.FC = () =>{

    const [procedures, setProcedure]= useState<ProceduresProps[]>([]);
        useEffect(() =>{
            api.get('/procedure').then(response =>{
            setProcedure(response.data);
        })
    
    }, []);

    // const update = useEffect(() =>{

    // })
    return(
        <Container>
            <Content>
                <ListContainer>
                        {procedures.map((procedure)=>(
                                <p key={procedure.procedure_id}>  {procedure.name} | {procedure.price} | {procedure.time}</p>
                        ))}
                        
                </ListContainer>
                <Link to="procedure">
                    <Button type="button" >Novo</Button>
                </Link>
                <Link to="dashboard">
                    Voltar
                </Link>
            </Content>
        </Container>
    );
};

export default ListProcedure;