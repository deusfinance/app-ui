import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/utils';

import { unregister } from './serviceWorker';
unregister();

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3ReactProvider>,
  document.getElementById('root')
);
