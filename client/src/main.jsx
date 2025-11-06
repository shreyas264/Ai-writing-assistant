import React from 'react';
import ReactDOM from 'react-dom/client';
import img from "./Images/logo.jpg";
import './index.css';

import {PrivyProvider} from '@privy-io/react-auth';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmhitpn9200fgl80cy54i083r"
      clientId="client-WY6SUU4DRhDCN4tHcxHgsQnxzjwrVfJbxzvu213q3oWs2"
      config={{
        
        // Create embedded wallets for users who don't have a wallet
        
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets'
          }
        }
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);