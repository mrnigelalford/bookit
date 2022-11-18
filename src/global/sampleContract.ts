import { char2Bytes } from '@taquito/utils';

const formattedInput: string = [
  'Tezos Signed Message:',
  'https://localhost:3000',
  new Date().toISOString(),
  '',
  '',
  'Bookit Marketplace - Contract transfer signature required before proceeding.',
].join(' ');

const bytes = char2Bytes(formattedInput);
export const payloadBytes = '050100' + char2Bytes(JSON.stringify(bytes.length)) + bytes;

//do a token lookup to get most of this data
// ex https://api.jakartanet.tzkt.io/v1/tokens?tokenId=1658967535073&contract=KT1DdKVXB6g3gnr3NQByMmJTNX6MDt1UMudY
// look into the 'metadata' key to pull creators and royalties
// const MintFA2Data = {
//   mfd_tokenId: 1658967535073,
//   mfd_tokenURI: 'https://api.jakartanet.tzkt.io/v1/tokens?tokenId=1658967535073&contract=KT1DdKVXB6g3gnr3NQByMmJTNX6MDt1UMudY',
//   mfd_supply : 100,
//   mfd_creators : list<part>;
//   mfd_royalties : list<part>;
//   mfd_signatures : list<bytes>;
// }

// check for bad signature

const book = {
  asset_class: 'NonFungible', // confirm this valid. Can it be an empty prop?
  asset_data: "00", // how do you make monetary transfer valid here
};

const dataTypeBytes = '3067ce64f894654e49d3c9c06f57d901e811f0ef0c5818fdcaf73b16a683f200';
const mockDataBytes = '050707020000002107070a00000016000073da8136c612c44069024f387d0290c63df5a0a600909c01020000002007070a000000160000e78efadd20f9b967023ba01016e5dc72223e7dd400ba03';

export const sampleTransfer = (signature_left: string) => ({
  order_left: {
    maker: 'edpkvSdmL6RrU5nvVwaXqhZDN46fbFzMjppxhMUghbWMeAdDWzEi5K', // maker is creator or seller of token
    make_asset: {
      asset_type: { // money to buy the NFT??
        asset_class: 'XTZ', 
        asset_data: char2Bytes('XTZ'),
      },
      asset_value: 100, // how many of this item are we transfering
    },
    taker: 'edpktkLyEcGjv7gEKYBhzCCFfYNgwiEfe6zesh8ALAunyhJAwcQAAH', // taker is buyer of the token
    take_asset: {
      asset_type: {
        asset_class: 'NonFungible',
        asset_data: char2Bytes('IPFS URL to book?'),
      },
      asset_value: 100,
    },
    salt: '3', // if===0 maker =/= signature if > 0 force signature check
    start: new Date('2022-11-07'), // date the transaction begins
    end: new Date('2022-11-09'), // date is in the future (use hh:mm:ss here to decrease the active window)
    data_type: dataTypeBytes,
    data: mockDataBytes,
  },
  signature_left,
  order_right: {
    maker: 'edpktkLyEcGjv7gEKYBhzCCFfYNgwiEfe6zesh8ALAunyhJAwcQAAH', // taker is buyer of the token, 'making' the money exchange
    make_asset: {
      asset_type: {
        asset_class: 'NonFungible',
        asset_data: char2Bytes('IPFS URL to book?'),
        },
        asset_value: 100,
      },
    taker: 'edpkvSdmL6RrU5nvVwaXqhZDN46fbFzMjppxhMUghbWMeAdDWzEi5K', // maker is creator or seller of token, 'taker' of the money
    take_asset: {
      asset_type: { // money to buy the NFT??
        asset_class: 'XTZ', 
        asset_data: char2Bytes('XTZ'),
      },
      asset_value: 100,
    },
    salt: '0', // if===0 maker =/= signature if > 0 force signature check
    start: new Date('2022-11-01'),
    end: new Date('2022-11-01'),
    data_type: dataTypeBytes, // should this match the order_left
    data: mockDataBytes, // should this match the order_left
  }
}
);

// create an additional party to sign for transactions?