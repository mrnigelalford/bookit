import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
// import { code } from './contracts/single_nft_marketplace';
// import { code } from './contracts/ts/fa2';
import { code } from './contracts/ts/multiple_nft_private';

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

  const operators = new MichelsonMap();
  // operators.set({ 0: owner, 1: '1' }, { 0: '1', 1: owner });

  const token_info = new MichelsonMap();
  token_info.set('01', '01');

  const token_metadata = new MichelsonMap();
  token_metadata.set(100, { token_id: 1, token_info });

  const user_permits = new MichelsonMap();
  user_permits.set('01', { created_at: new Date(), expiry: 365 });

  const permits = new MichelsonMap();
  permits.set(owner, { counter: 0, user_expiry: 0, user_permits });

  const operators_for_all = new MichelsonMap();
  const metadata = new MichelsonMap();
  metadata.set(JSON.stringify(nftInfo), '01');

  return Tezos.wallet
    .originate({
      code,
      storage: {
        owner,
        minters: [owner],
        itokenid: 'abcd123',
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
