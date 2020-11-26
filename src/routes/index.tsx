import React from 'react';
import { Switch } from 'react-router-dom'; 

import Route from './Route';

import ManageStatus from '../pages/Status/List/List';
import CadastroStatus from '../pages/Status/';

import Procedure from '../pages/Procedure';
import ListProcedure from '../pages/Procedure/List';

import ManagementPayment from '../pages/Payment/index';
import ListPayment from '../pages/Payment/List';

import ManagementEmployee from '../pages/Employee'
import Login from '../pages/Login';

import CadastroCliente from '../pages/Client';
import LoginClient from '../pages/Login/LoginClient';


import Dashboard from '../pages/Dashboard';
import DashboardClient from '../pages/Dashboard/Client';

import Scheduled from '../pages/Scheduled'

const Routes: React.FC = () =>(
    <Switch>
        {/* CLIENT */}
        <Route path="/" exact component={Login}/>
        <Route path="/login" component={LoginClient}/>
        <Route path="/cadastro" component={CadastroCliente}/>
        {/* CLIENT */}

        {/* Employee */}
        <Route path="/funcionarios" exact component={ManagementEmployee} isPrivate/>
        <Route path="/cadastro_funcionarios" exact component={ManagementEmployee} isPrivate/>
        {/* Employee */}

        <Route path="/dashboard" component={Dashboard} isPrivate />

        {/* STATUS */}
        <Route path="/status" exact component={ManageStatus} isPrivate />
        <Route path="/cadastro_status/" exact component={CadastroStatus} isPrivate />
        <Route path="/cadastro_status/:status_id" exact component={CadastroStatus} isPrivate />
        {/* STATUS */}

        {/* PROCEDURE */}
        <Route path="/procedimentos" exact component={ListProcedure} isPrivate />
        <Route path="/cadastro_procedimento" exact component={Procedure} isPrivate />
        <Route path="/cadastro_procedimento/:procedure_id" exact component={Procedure} isPrivate />
        {/* PROCEDURE */}

        {/* PAYMENT */}   
        <Route path="/pagamentos" exact component={ListPayment} isPrivate />
        <Route path="/cadastro_pagamento" exact component={ManagementPayment} isPrivate />
        <Route path="/cadastro_pagamento/:payment_id" exact component={ManagementPayment} isPrivate />
         {/* PAYMENT */}  

         {/* Teste */}
         <Route path="/dashboard_cliente" exact component={DashboardClient} isPrivate />
          {/* Teste */}

          {/* Agendamentos */}
         <Route path="/agendados" exact component={Scheduled} isPrivate/>
          {/* Agendamentos */}
    </Switch>
);

export default Routes;

