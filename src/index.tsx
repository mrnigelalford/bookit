import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Header from './components/header/Header';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { Network, NetworkType } from '@airgap/beacon-sdk';

const Tezos = new TezosToolkit('https://jakartanet.ecadinfra.com');
const network: Network = { type: NetworkType.JAKARTANET };

const wallet = new BeaconWallet({
  name: 'Bookit - Book NFT marketplace',
  preferredNetwork: network.type,
});

Tezos.setWalletProvider(wallet);

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <Header wallet={wallet} Tezos={Tezos} />
    <App wallet={wallet} Tezos={Tezos} />
  </BrowserRouter>,
  document.getElementById('root')
);
