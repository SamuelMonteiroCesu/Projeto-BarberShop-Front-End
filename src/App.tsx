import React from 'react';
import GlobalStyle from './styles/globalstyle';
// import CadastroCliente from './pages/Client';
// import CadastroStatus from './pages/Status';
// import CadastroProcedimento from './pages/Procedure';
// import ManagementPayment from './pages/Payment';
// import ManagementEmployee from './pages/Employee';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';



const App: React.FC = () => (
    <>
     <AuthProvider>
         <Login/> {/* EXEMPLO DE UTILIZAÇÃO DE CONTEXTO PARA VALIDALÇAO */}
      </AuthProvider>
      <GlobalStyle/>
    </>
    // <>
    //   <Login/>
    //   <GlobalStyle/>
    // </>
  );

export default App;
