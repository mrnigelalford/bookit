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
  NFT: 'KT1DdKVXB6g3gnr3NQByMmJTNX6MDt1UMudY', // - private nft
  Exchange: 'KT1NNZiiowQxR27u5eGvUaeBUzKxC4tsPPeg',
  Royalties: 'KT1PruZrV3Agq8ZPL5uSzsMHdka2EbE6NVj5',
  transferProxy: 'KT1NTuhMG6BoaYfLT6oZiDMnvrNgbX2rZAij'
}

function App({ Tezos, wallet, toast }: AppProps) {
  const routes = setRoutes({ Tezos, wallet, toast });
  return (
    <div>
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
    </div>
  );
}

export default App;
