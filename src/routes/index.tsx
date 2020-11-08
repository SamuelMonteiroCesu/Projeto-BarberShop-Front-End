import React from 'react';
import { Switch } from 'react-router-dom'; 

import Route from './Route';
import ManageStatus from '../pages/Status';
import  Procedure from '../pages/Procedure';
import ListProcedure from '../pages/Procedure/List';
import Payment from '../pages/Payment';
import Employee from '../pages/Employee';
import CadastroCliente from '../pages/Client';
import LoginClient from '../pages/Login/LoginClient';
import Login from '../pages/Login';

import Dashboard from '../pages/Dashboard';

//import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () =>(
    <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/login" component={LoginClient}/>
        <Route path="/cadastro" component={CadastroCliente}/>

        <Route path="/dashboard" component={Dashboard} isPrivate />


        <Route path="/status" component={ManageStatus} isPrivate />
        <Route path="/procedure" component={Procedure} isPrivate />
        <Route path="/listProcedure" component={ListProcedure} isPrivate />
        
        <Route path="/payment" component={Payment} isPrivate />
        <Route path="/employee" component={Employee} isPrivate />
    </Switch>
);

export default Routes;

