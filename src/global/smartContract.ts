import { TezosToolkit } from '@taquito/taquito';
import { code } from './contracts/single_nft_marketplace';

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

export const Originate = async ({ Tezos, nftInfo, owner }: ConnectProps) =>
  Tezos.contract
    .originate({
      code,
      storage: {
        owner,
        owner_candidate: owner,
        paused: false,
        royalties: [{ partAccount: owner, partValue: nftInfo.royalties }],
        ledger: [
          {
            address: owner,
          },
        ],
        operator: [
          {
            address: owner,
          },
        ],
        token_medatadata: {
          token_id: 1,
        },
        token_info: {
          token_id: 1,
        },
        metadata: {
          nftInfo,
        },
        default_expiry: 90,
        operator_for_all: {
          address: owner,
        },
        user_permits: {
          created_at: new Date(),
          expiry: 90,
        },
        user_expiry: 90,
      },
    })
    .then((originationOp) => {
      console.log('OO', originationOp);
      return originationOp.contract();
    })
    .then((contract) => {
      console.log(`Origination completed.`);
    })
    .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
