import React from 'react';
import { Link } from 'react-router-dom';
import { BiLogOutCircle, BiUserCircle } from 'react-icons/bi'

import { Container, Header, HeaderContent, Profile, Content, AnimationContainer } from './style';
import { useAuth } from '../../hooks/auth';
import { FiPower } from 'react-icons/fi';
const Dashboard: React.FC = () =>{

    const { logout } = useAuth();
    return(
        <Container>
            <Header>
                <HeaderContent>
                    <Profile>
                        <BiUserCircle/>
                        <div>
                            <span>Bem-vindo,</span>
                            <strong>Samuel Monteiro</strong>
                        </div>
                        <button type="button" onClick={logout}>
                            <FiPower/>
                        </button>
                    </Profile>
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
            {/* <button type="button" onClick={logout}>
                <BiLogOutCircle/>
                Sair
            </button> */}
            </AnimationContainer>
        </Content>
        </Container>
    );
}

export default Dashboard;