import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
// import { code } from './contracts/single_nft_marketplace';
import { code } from './contracts/fa2';

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
  ledger.set('1', owner);

  const operator = new MichelsonMap();
  const token_info = new MichelsonMap();
  token_info.set('01', '01');

  const token_metadata = new MichelsonMap();
  token_metadata.set(100, { token_id: 1, token_info });

  const user_permits = new MichelsonMap();
  user_permits.set('01', { created_at: new Date(), expiry: 365 });

  const permits = new MichelsonMap();
  permits.set(owner, { counter: 0, user_expiry: 0, user_permits });

  const operator_for_all = new MichelsonMap();
  const metadata = new MichelsonMap();
  metadata.set(nftInfo, '01');

  const idea = new MichelsonMap();
  idea.set(100, {
    desc: 'first vote',
    nbvotes: 0,
  });

  const voter = new MichelsonMap();
  voter.set(owner, 1);

  return Tezos.wallet
    .originate({
      code,
      // storage: {
      //   owner,
      //   royalties,
      //   ledger,
      //   operator,
      //   token_metadata,
      //   permits,
      //   operator_for_all,
      //   default_expiry: 9999,
      //   metadata,
      //   minters: [owner],
      // },
      storage: {
        idea,
        voter,
        selected: [1],
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
