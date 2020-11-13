import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './styles/globalstyle';

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
