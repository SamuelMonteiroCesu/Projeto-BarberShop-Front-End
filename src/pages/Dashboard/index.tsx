import React from 'react';
import { Link } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi'

import { Container, Content, AnimationContainer } from './style';
import { useAuth } from '../../hooks/auth';
const Dashboard: React.FC = () =>{

    const { logout } = useAuth();
    return(
        <Container>
        <Content>
            <AnimationContainer>
            <Link to="procedimentos">
                {/* <FiLogIn/> */}
                Procedimentos
            </Link>
            <Link to="pagamentos">
                {/* <FiLogIn/> */}
                Formas de pagamentos
            </Link>
            <Link to="status">
                {/* <FiLogIn/> */}
                Status
            </Link>
            <Link to="funcionarios">
                {/* <FiLogIn/> */}
                Funcionários
            </Link>
            <button type="button" onClick={logout}>
                <BiLogOutCircle/>
                Sair
            </button>
            </AnimationContainer>
        </Content>
        </Container>
    );
}

export default Dashboard;