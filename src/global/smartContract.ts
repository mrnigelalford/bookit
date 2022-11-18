import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
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

export const mintToken = async ({ Tezos, nftInfo, owner }: ConnectProps) => {
  const token_info = new MichelsonMap();
  token_info.set(JSON.stringify(nftInfo), '01');

  const royalties = [{ partAccount: owner, partValue: nftInfo.royalties }];

  return Tezos.wallet
    .at(process.env.REACT_APP_CONTRACT_PUBLIC_NFT)
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
// activeAccount?.address, 'tz1ZiNYG7hxDFome58tuu6CTRm9Mc1R7bxuV'

// transferproxy address

// {list: {0: "address", 1: "address"}}

// NOTE: This should be run everytime a user mints
export const updateOperators = async({Tezos, activeAccount, wallet}) => {
  return Tezos.wallet
    .at(process.env.REACT_APP_CONTRACT_PUBLIC_NFT) // address of exchange
    .then((contract) => contract.methods.update_operators_for_all([{0: activeAccount.address}]).send())
    .then((op) => {
      console.log(`Waiting for ${op} to be confirmed...`);
      return op?.confirmation(3)?.then(() => op);
    })
    .then((op) => op?.receipt)
    .catch((error) => console.log('error: ', error));
}


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
    .at(process.env.REACT_APP_CONTRACT_EXCHANGE)
    .then((contract) => contract.methodsObject.match_orders(sampleTransfer(signature)).send())
    .then((op) => {
      console.log(`Waiting for ${op} to be confirmed...`);
      return op.confirmation(3).then(() => op);
    })
    .then((op) => op.receipt)
    .catch((error) => console.log('error: ', error));
};
