import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Header from './components/header/Header';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';

import { ToastContainer, toast } from 'react-toastify';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/Footer';

const Tezos = new TezosToolkit(process.env.REACT_APP_TEZOS_ENDPOINT || '');

const wallet = new BeaconWallet({
  name: 'Bookit - Book NFT marketplace'
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URL,
  cache: new InMemoryCache(),
});

Tezos.setWalletProvider(wallet);

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ScrollToTop />
      <ToastContainer />
      <div>
        <Header wallet={wallet} Tezos={Tezos} />
        <App wallet={wallet} Tezos={Tezos} toast={toast} />
        <Footer />
      </div>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
