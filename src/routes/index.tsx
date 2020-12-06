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

import ScheduledTest from '../pages/ScheduledTest'

import  Profile  from '../pages/Profile';
import RecoveryPass from '../pages/RecoveryPassword';

import ScheduleProfessional from '../pages/ScheduleProfessional';
import ScheduleClient from '../pages/ScheduledClient';
import HistoricClient from '../pages/HistoricClient';
const Routes: React.FC = () =>(
    <Switch>
        {/* CLIENT */}
        <Route path="/" exact component={Login}/>
        <Route path="/login" component={LoginClient}/>
        <Route path="/cadastro" component={CadastroCliente}/>
        {/* CLIENT */}

        {/* RECOVERY */}
        <Route path="/recuperar_senha" component={RecoveryPass}/>
        {/* RECOVERY */}

        {/* Employee */}
        <Route path="/funcionarios" exact component={ManagementEmployee} isEmployee/>
        <Route path="/cadastro_funcionarios" exact component={ManagementEmployee} isEmployee/>
        {/* Employee */}

        <Route path="/dashboard" component={Dashboard} isEmployee />

        {/* STATUS */}
        <Route path="/status" exact component={ManageStatus} isEmployee />
        <Route path="/cadastro_status/" exact component={CadastroStatus} isEmployee />
        <Route path="/cadastro_status/:status_id" exact component={CadastroStatus} isEmployee />
        {/* STATUS */}

        {/* PROCEDURE */}
        <Route path="/procedimentos" exact component={ListProcedure} isEmployee />
        <Route path="/cadastro_procedimento" exact component={Procedure} isEmployee />
        <Route path="/cadastro_procedimento/:procedure_id" exact component={Procedure} isEmployee />
        {/* PROCEDURE */}

        {/* PAYMENT */}   
        <Route path="/pagamentos" exact component={ListPayment} isEmployee />
        <Route path="/cadastro_pagamento" exact component={ManagementPayment} isEmployee />
        <Route path="/cadastro_pagamento/:payment_id" exact component={ManagementPayment} isEmployee />
         {/* PAYMENT */}  

         {/* Teste */}
         <Route path="/dashboard_cliente" exact component={DashboardClient} isEmployee />
          {/* Teste */}

          {/* Agendamentos */}
         <Route path="/agendados" exact component={ScheduledTest} isEmployee/>
          {/* Agendamentos */}

          {/* Perfil */}
          <Route path="/perfil" exact component={Profile} isEmployee/>
          {/* Perfil */}

          {/* Profissional agenda cliente */}
          <Route path="/agendar_cliente/" exact component={ScheduleProfessional} isEmployee/>
          <Route path="/agendar_cliente/:id" exact component={ScheduleProfessional} isEmployee/>
           {/* Profissional agenda cliente */}

            {/* Cliente se agenda */}
           <Route path="/novo_agendamento/" exact component={ScheduleClient} isEmployee/>
           <Route path="/agendamentos/" exact component={HistoricClient} isEmployee/>
            {/* Cliente se agenda */}
    </Switch>
);

export default Routes;

