import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
// import { code } from './contracts/single_nft_marketplace';
// import { code } from './contracts/ts/fa2';
import { code } from './contracts/ts/multiple_nft_private';
import { char2Bytes } from '@taquito/utils';
import { Contracts } from '../App';
import { sampleTransfer } from './sampleContract';

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

// TODO:
// 1. ORIGINATE exchange [x] | transfer manager [x] | royalties [x]
// 2. call the exchange contract
// 3. crack open beer :-)

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

export const marketBuyBook = async ({ Tezos }) => {
  // {
  //   "signature_left": "edsigtvaveRzvBJTWKETtTxzrzLDibgf86sZMHbMMPoh1kEkrw15jZhtZSBt8PLFWEDL2xbPkdM4BLky77UPvUAxjUPaD6qD9AV",
  //   "signature_right": null
  // }

  const makerAddress = 'edpkuPDZ28Z2VPjDSksxjkqe9kiETwyjBTfyhqVuWGpo4KReRxopxf';
  const takerAddress = 'edpkubYYqddzgeEsHNMcBxDaLT4gH5iXd2ByfrAaWEvNqajY4a6dcg';
//tz1Y1eg4zzwzBTFrr7DRmdw2DDZRa339Qw9Y
// sampleTransfer

  console.clear();
  return Tezos.wallet
    .at(Contracts.Exchange)
    .then((contract) => {
        contract.methods.match_orders([]).send();
  })
    .then((op) => {
      console.log(`Waiting for ${op} to be confirmed...`);
      return op.confirmation(3).then(() => op);
    })
    .then((op) => op.receipt)
    .catch((error) => console.log(error.message));
};
