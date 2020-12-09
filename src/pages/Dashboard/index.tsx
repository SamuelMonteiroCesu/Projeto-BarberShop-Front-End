import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi'

import { Container, Header, HeaderContent, Profile, Content, AnimationContainer } from './style';
import { useAuth } from '../../hooks/auth';
import { FiPower } from 'react-icons/fi';
import { Links } from '../Status/style';
const Dashboard: React.FC = () =>{

    const { logout, user } = useAuth();
    
    console.log(user.is_staff);

    if( user.is_staff === false){
        return(
            <Redirect
                to={{ pathname: '/dashboard_cliente'}}
            />
        )
    }else{
        return(
            <Container>
                <Header>
                    <HeaderContent>
                        <Profile>
                            <BiUserCircle/>
                            <div>
                                <span>Bem-vindo,</span>
                                <Link to="/perfil">
                                    <strong>{user.first_name}</strong>
                                </Link>
                            </div>
                        </Profile>
                            <button type="button" onClick={logout}>
                                <FiPower/>
                            </button>
                    </HeaderContent>
                </Header>
            <Content>
                <AnimationContainer>
                <Link to="procedimentos">
               
                    Procedimentos
                </Link>
                <Link to="pagamentos">
                    
                    Formas de pagamentos
                </Link>
                <Link to="status">
                    
                    Status
                </Link>
                <Link to="cadastro_funcionarios">
            
                    Funcionários
                </Link>
                <Link to="cadastro_cliente">
            
                    Novo Cliente
                </Link>
                <Link to="agendados">
                    Agendamentos
                </Link>
                </AnimationContainer>
            </Content>
            </Container>
        );
   
    }
}

export default Dashboard;