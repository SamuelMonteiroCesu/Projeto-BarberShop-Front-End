import React from 'react';
import GlobalStyle from './styles/globalstyle';
import CadastroCliente from './pages/CadastroCliente';

const App: React.FC = () => (
    <>
      <CadastroCliente/>
      <GlobalStyle/>
    </>
  );

export default App;
