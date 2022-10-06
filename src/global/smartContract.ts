import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
// import { code } from './contracts/single_nft_marketplace';
// import { code } from './contracts/ts/fa2';
// import { char2Bytes } from '@taquito/utils';
import { Contracts } from '../App';
import { payloadBytes, sampleTransfer } from './sampleContract';
import { RequestSignPayloadInput, SigningType } from '@airgap/beacon-sdk';

interface MintProps {
  Tezos: TezosToolkit;
  storage: any;
  code: any;
}

interface ConnectProps {
  Tezos: TezosToolkit;
  nftInfo: {
    IpfsHash?: string;
    price?: number;
    title?: string | null;
    description?: string | null;
    category?: string;
    bookType?: string;
    royalties?: number;
    quantity?: number;
    authorName?: string;
  };
  owner: string;
}

// export const Originate = async ({ Tezos, nftInfo, owner }: ConnectProps) => {
//   const royalties = new MichelsonMap();
//   royalties.set('1', [{ partAccount: owner, partValue: nftInfo.royalties }]);

//   const ledger = new MichelsonMap();
//   ledger.set({ 0: '1', 1: owner }, 20);

//   console.log('ow: ', owner);

//   const operators = new MichelsonMap();
//   operators.set(
//     {
//       0: owner, // address
//       1: '1', // nat
//       2: owner, // address
//     },
//     100
//   );

//   const token_info = new MichelsonMap();
//   token_info.set(JSON.stringify(nftInfo), '01');

//   const token_metadata = new MichelsonMap();
//   token_metadata.set(100, { token_id: 1, token_info });

//   const user_permits = new MichelsonMap();
//   user_permits.set('01', { created_at: new Date(), expiry: 365 });

//   const permits = new MichelsonMap();
//   permits.set(owner, { counter: 0, user_expiry: 0, user_permits });

//   const operators_for_all = new MichelsonMap();
//   const metadata = new MichelsonMap();

//   Object.keys(nftInfo).forEach((k, i) => {
//     metadata.set(k, char2Bytes(nftInfo[k].toString().toLowerCase()));
//   });

//   return Tezos.wallet
//     .originate({
//       code,
//       storage: {
//         owner,
//         minters: [owner],
//         itokenid: 2,
//         royalties,
//         ledger,
//         operators,
//         token_metadata,
//         permits,
//         operators_for_all,
//         default_expiry: '9999',
//         metadata,
//       },
//     })
//     .send()
//     .then((originationOp) => {
//       console.log('OO', originationOp);
//       return originationOp.contract();
//     })
//     .then((contract) => {
//       console.log(`Origination completed for ${contract.address}.`);
//     })
//     .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
// };

export const mintToken = async ({ Tezos, nftInfo, owner }: ConnectProps) => {
  const token_info = new MichelsonMap();
  token_info.set(JSON.stringify(nftInfo), '01');

  const royalties = [{ partAccount: owner, partValue: nftInfo.royalties }];

  return Tezos.wallet
    .at(Contracts.Exchange)
    .then((contract) => {
      console.log('starting mint...');
      return contract.methods
        .mint(Date.now(), owner, nftInfo.quantity, token_info, royalties)
        .send();
    })
    .then((op) => {
      console.log(`Waiting for ${op} to be confirmed...`);
      return op.confirmation(3).then(() => op);
    })
    .then((op) => op.receipt)
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
};

/**
  @description will originate a set of michelson code into a new contract
  @param Tezos Taquito Toolkit Tezos network call
  @param storage various params required for the given contract
  @param code js translation of the michelson code to become the smart contract
  */
export const originateContract = async ({
  Tezos,
  storage,
  code,
}: MintProps) => {
  return Tezos.wallet
    .originate({
      code,
      storage,
    })
    .send()
    .then((originationOp) => {
      console.log('OO', originationOp);
      return originationOp.contract();
    })
    .then((contract) => {
      console.log(`Origination completed for ${contract.address}.`);
    })
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
};


//TODO: Delete this once you get transfer working
export const marketBuyBook = async ({ Tezos, activeAccount, wallet }) => {
  console.clear();

  const payload: RequestSignPayloadInput = {
    signingType: SigningType.MICHELINE,
    payload: payloadBytes,
    sourceAddress: activeAccount.address,
  };
  const signedPayload = await wallet.client.requestSignPayload(payload);
  const { signature } = signedPayload;

  return Tezos.wallet
    .at(Contracts.Exchange)
    .then((contract) =>
      contract.methodsObject.match_orders(sampleTransfer(signature)).send()
    )
    .then((op) => {
      console.log(`Waiting for ${op} to be confirmed...`);
      return op.confirmation(3).then(() => op);
    })
    .then((op) => op.receipt)
    .catch((error) => console.log(error.message));
};
