import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";

/* Importa estilos globais */
import './styles/global.css';
import './index.css';

/*
  Ponto de entrada da aplicação React.
  Tudo é renderizado dentro da div #root (index.html)
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    {/* Habilita o uso de rotas no projeto */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>,
);
