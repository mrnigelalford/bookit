import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { setRoutes } from './pages/index';

import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';

interface AppProps {
  wallet: BeaconWallet;
  Tezos: TezosToolkit;
  toast: any;
}

export const Contracts = {
  NFT: 'KT1DdKVXB6g3gnr3NQByMmJTNX6MDt1UMudY',
  Exchange: 'KT1WPTFNriBBhmxy5J5RA6q1EcFUiCzwPpmw',
  Royalties: 'KT1PruZrV3Agq8ZPL5uSzsMHdka2EbE6NVj5',
  transferProxy: 'KT1NTuhMG6BoaYfLT6oZiDMnvrNgbX2rZAij'
}

function App({ Tezos, wallet, toast }: AppProps) {
  const routes = setRoutes({ Tezos, wallet, toast });
  return (
    <Routes>
      {routes.map(({ path, component }, index) => (
        <Route
          // @ts-ignore
          onUpdate={() => window.scrollTo(0, 0)}
          exact={true}
          path={path}
          element={component}
          key={index}
        />
      ))}
    </Routes>
  );
}

export default App;
