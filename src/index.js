import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/utils';
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import { unregister } from './serviceWorker';

unregister();

ReactDOM.render(<>
  <FixedGlobalStyle />
  <Web3ReactProvider getLibrary={getLibrary}>
    <ThemeProvider>
      <ThemedGlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Web3ReactProvider></>,
  document.getElementById('root')
);
