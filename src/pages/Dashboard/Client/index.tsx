import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BiLogOutCircle, BiUserCircle } from 'react-icons/bi'

import { Container, Header, HeaderContent, Profile, Content, AnimationContainer, Schedule } from './style';
import { useAuth } from '../../../hooks/auth';
import { FiPower } from 'react-icons/fi';
import { Links } from '../../Status/style';
import api from '../../../services/api';

const DashboardClient: React.FC = () => {

    const { logout, user } = useAuth();

    
    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Profile>
                        <BiUserCircle />
                        <div>
                            <span>Bem-vindo,</span>
                            <Link to="/perfil">
                                <strong>{user.first_name}</strong>
                            </Link>
                        </div>
                    </Profile>
                    <button type="button" onClick={logout}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <AnimationContainer>
                    <Link to="novo_agendamento">

                        Novo Agendamento
                </Link>
                    <Link to="agendamentos">

                        Agendamentos
                </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );

}


export default DashboardClient;