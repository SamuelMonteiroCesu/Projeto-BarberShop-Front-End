import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, AnimationContainer } from './style';
const Dashboard: React.FC = () =>{

    return(
        <Container>
        <Content>
            <AnimationContainer>
            <Link to="listProcedure">
                {/* <FiLogIn/> */}
                Procedimentos
            </Link>
            <Link to="payment">
                {/* <FiLogIn/> */}
                Formas de pagamentos
            </Link>
            <Link to="status">
                {/* <FiLogIn/> */}
                Status
            </Link>
            <Link to="employee">
                {/* <FiLogIn/> */}
                Funcionários
            </Link>
            </AnimationContainer>
        </Content>
        </Container>
    );
}

export default Dashboard;