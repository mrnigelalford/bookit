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

export const sampleTransfer = (signature_left: string) => ({
  order_left: {
    end: null,
    data: '050707020000002107070a00000016000073da8136c612c44069024f387d0290c63df5a0a600909c01020000002007070a000000160000e78efadd20f9b967023ba01016e5dc72223e7dd400ba03',
    salt: '3', // if===0 maker =/= signature if > 0 force signature check
    maker: 'edpkuPDZ28Z2VPjDSksxjkqe9kiETwyjBTfyhqVuWGpo4KReRxopxf',
    start: null,
    // taker: null,
    data_type: '3067ce64f894654e49d3c9c06f57d901e811f0ef0c5818fdcaf73b16a683f200',
    make_asset: {
      asset_type: {
        asset_data: "00", // how do you make monetary transfer valid here
          asset_class: {
            XTZ: {}, // confirm this valid. Can it be an empty prop?
          },
      },
      asset_value: 210000000,
    },
    take_asset: {
      asset_type: {
        asset_data: char2Bytes('IPFS URL to book?'),
        asset_class: {
          FA_2: 1
        },
      },
      asset_value: 21,
    },
  },
  order_right: {
    end: null,
    data: char2Bytes('bischon of a pigeon'),
    salt: '0', // if===0 maker =/= signature if > 0 force signature check
    maker: 'edpkubYYqddzgeEsHNMcBxDaLT4gH5iXd2ByfrAaWEvNqajY4a6dcg',
    start: null,
    // taker: 'edpkubYYqddzgeEsHNMcBxDaLT4gH5iXd2ByfrAaWEvNqajY4a6dcg',
    data_type:
      char2Bytes('ebook'),
    make_asset: {
      asset_type: {
        asset_data: char2Bytes('IPFS URL to book?'),
        asset_class: {
          FA_2: 1
        },
      },
      asset_value: 21,
    },
    take_asset: {
      asset_type: {
        asset_data: "00", // how do you make monetary transfer valid here
          asset_class: {
            XTZ: {}, // confirm this valid. Can it be an empty prop?
          },
      },
      asset_value: 210000000,
    },
  },
  signature_left
});
