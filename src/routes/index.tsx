import React from 'react';
import { Switch } from 'react-router-dom'; 

import Route from './Routes';

import CadastroCliente from '../pages/Client';
import LoginClient from '../pages/Login/LoginClient';
import Login from '../pages/Login';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () =>(
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/login" exact component={LoginClient}/>
        <Route path="/cadastro" component={CadastroCliente}/>

        <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
);

export default Routes;

