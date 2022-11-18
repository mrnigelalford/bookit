import React, { useEffect, useState } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';


interface OriginateProps {
  wallet?: BeaconWallet;
  Tezos?: TezosToolkit;
  toast: any;
}

const Originate = ({ wallet, Tezos, toast }: OriginateProps) => {


const deployContract = async () => {
  console.log('starting');
  await Tezos?.wallet.originate({
    code: '',
    storage: ''
  }
).send().then(c => {
  console.log('done');
  console.log(c);
}).catch(e => console.log('error: ', e));
}

  return (
    <div>
      <h1>Welcome to the Origination station!</h1>

      <button onClick={() => {}}> Buy Book </button>
    </div>
  )
}

export default Originate;
