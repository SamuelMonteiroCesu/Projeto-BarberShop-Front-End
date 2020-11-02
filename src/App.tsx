import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import GlobalStyle from './styles/globalstyle';
//import CadastroCliente from './pages/Client';
// import CadastroStatus from './pages/Status';
// import CadastroProcedimento from './pages/Procedure';
// import ManagementPayment from './pages/Payment';
// import ManagementEmployee from './pages/Employee';
import LoginClient from './pages/Login/LoginClient';
import Routes from './routes';

import AppProvider from './hooks';



const App: React.FC = () => (
    <Router>
      <AppProvider>
          <Routes />{/* EXEMPLO DE UTILIZAÇÃO DE CONTEXTO PARA VALIDALÇAO */}
      </AppProvider>

      <GlobalStyle/>
    </Router>
  );

export default App;
