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

export const contract = 'KT1DdKVXB6g3gnr3NQByMmJTNX6MDt1UMudY';

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
