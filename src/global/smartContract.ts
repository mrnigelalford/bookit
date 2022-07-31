import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
// import { code } from './contracts/single_nft_marketplace';
// import { code } from './contracts/ts/fa2';
import { code } from './contracts/ts/multiple_nft_private';
import { char2Bytes } from '@taquito/utils';
import { contract } from '../App';

interface MintProps {
  Tezos: TezosToolkit;
  storage: any;
  code: any
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

export const Originate = async ({ Tezos, nftInfo, owner }: ConnectProps) => {
  const royalties = new MichelsonMap();
  royalties.set('1', [{ partAccount: owner, partValue: nftInfo.royalties }]);

  const ledger = new MichelsonMap();
  ledger.set({ 0: '1', 1: owner }, 20);

  console.log('ow: ', owner);

  const operators = new MichelsonMap();
  operators.set(
    {
      0: owner, // address
      1: '1', // nat
      2: owner, // address
    },
    100
  );

  const token_info = new MichelsonMap();
  token_info.set(JSON.stringify(nftInfo), '01');

  const token_metadata = new MichelsonMap();
  token_metadata.set(100, { token_id: 1, token_info });

  const user_permits = new MichelsonMap();
  user_permits.set('01', { created_at: new Date(), expiry: 365 });

  const permits = new MichelsonMap();
  permits.set(owner, { counter: 0, user_expiry: 0, user_permits });

  const operators_for_all = new MichelsonMap();
  const metadata = new MichelsonMap();

  Object.keys(nftInfo).forEach((k, i) => {
    metadata.set(k, char2Bytes(nftInfo[k].toString().toLowerCase()));
  });

  return Tezos.wallet
    .originate({
      code,
      storage: {
        owner,
        minters: [owner],
        itokenid: 2,
        royalties,
        ledger,
        operators,
        token_metadata,
        permits,
        operators_for_all,
        default_expiry: '9999',
        metadata,
      },
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

// TODO: 
  // 1. ORIGINATE exchange [x] | transfer manager [x] | royalties [x]

  // NOTE: The supporting contracts needs to be set in order
  // proxy, manager, royalties. 
  // The proxy address will be sent to the manager
  // manager will need exchange addresses
  // 2. send calls to each contract in order (https://github.com/rarible/tezos-protocol-contracts/blob/9c83e34ec41ef66f3ac4f286d2dce8002ccda70e/exchange-v2/README.md)
  // 3. crack open beer :-)

export const mintToken = async ({ Tezos, nftInfo, owner }: ConnectProps) => {
  const token_info = new MichelsonMap();
  token_info.set(JSON.stringify(nftInfo), '01');

  const royalties = [{ partAccount: owner, partValue: nftInfo.royalties }];

  return Tezos.wallet
    .at(contract)
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

export const setOriginate = async ({ Tezos, storage, code }: MintProps) => {
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
}

export const transferBook = async ({ Tezos }) => {
  const _owner = 'tz1Y1eg4zzwzBTFrr7DRmdw2DDZRa339Qw9Y';
  const _buyer = 'tz1fcw6J12ArA1zLG2ATLsenfjYPb7b95SKB';
  const _sample_token_id = '1658967535073';

  // { to: _buyer, token_id: _sample_token_id, amount: 1 }

  return Tezos.wallet
    .at(contract)
    .then((contract) => contract.methods
    .transfer([{
      0: _owner,
      1: [{
        amount: 0,
        to: _buyer,
        token_id_dest: _buyer,
        token_id: _sample_token_id
      }]
    }]
    ).send().send())
    .then((op) => {
      console.log(`Waiting for ${op} to be confirmed...`);
      return op.confirmation(3).then(() => op);
    })
    .then((op) => op.receipt)
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
};
