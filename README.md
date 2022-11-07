# Welcome to Bookit!
![logo](https://64.media.tumblr.com/0d1384f5926bf41dfa090ad86595346b/b2c02e89d3182d04-c3/s540x810/ae67933ba43db02d83e4be3c54deee60ba32c230.gif)


[![Jest UI Tests](https://github.com/mrnigelalford/bookit/actions/workflows/nodejs.yml/badge.svg?branch=master)](https://github.com/mrnigelalford/bookit/actions/workflows/nodejs.yml)

[![Mocha Contract Tests](https://github.com/mrnigelalford/bookit/actions/workflows/mochaTests.yml/badge.svg)](https://github.com/mrnigelalford/bookit/actions/workflows/mochaTests.yml)

## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---
## Task management

Here's the github [project management page](https://github.com/users/mrnigelalford/projects/2)

---

## Local Development

There are components added to to this project from Tezos that cause errors in Webpack. We have to add resolve support to help webpack read specific node_modules

```
// webpack.config.js:308

...
resolve: {
  fallback: { "crypto": require.resolve("crypto-browserify"), "stream": require.resolve("stream-browserify"), "path": require.resolve("path-browserify"),
  "buffer": require.resolve("buffer/") },
  ...

```

#### Completium-CLI
This project uses Archetype and completium. For now version archetype.1.2.11 is being used

### originating the contracts used here
  The supporting contracts needs to be set in order
  1. proxy
  2. exchange (needs approx 6tez)
  3. manager
  4. royalties.

  The proxy address will be sent to the manager
  manager will need exchange addresses

  [extra documentation](https://github.com/rarible/tezos-protocol-contracts/blob/9c83e34ec41ef66f3ac4f286d2dce8002ccda70e/exchange-v2/README.md)

You'll need funds for most interactions with smart contracts. The testing for this project is based on Kathmandu

Ex. Deploy contract via completium
```
completium-cli deploy src/global/contracts/arl/multiple_nft_public.arl --parameters '{"owner": "tz1fcw6J12ArA1zLG2ATLsenfjYPb7b95SKB"}' 
```

#### Faucet

Access the appropriate faucet start [here](https://teztnets.xyz/)


#### Testing

We use the completium cli to setup network testing.
Be sure that the network is set to 'mockup mode' to ensure assertions pass
`completium-cli set endpoint mockup`


#### Tezos client CLI

[Tezos client info](https://assets.tqtezos.com/docs/setup/1-tezos-client/)


---
## Tezos Documentation

[list of RPC nodes](https://tezostaquito.io/docs/rpc_nodes/)

Usefull info for book authors
[Choosing the right ebook format](https://learn.g2.com/ebook-formats)


order of operations

1. get storage
```
https://api.jakartanet.tzkt.io/v1/contracts/KT1DdKVXB6g3gnr3NQByMmJTNX6MDt1UMudY/storage

## iterate object
{
    "owner": "tz1Y1eg4zzwzBTFrr7DRmdw2DDZRa339Qw9Y",
    "ledger": 34443,
    "paused": false,
    "minters": [
        "tz1Y1eg4zzwzBTFrr7DRmdw2DDZRa339Qw9Y"
    ],
    "permits": 34446,
    "metadata": 34448,
    "operators": 34444,
    "royalties": 34442,
    "default_expiry": "9999",
    "token_metadata": 34445,
    "owner_candidate": null,
    "operators_for_all": 34447
}
```

2. Call bigmaps & keys with id of storage
```
https://api.jakartanet.tzkt.io/v1/bigmaps/34445/keys?active=true&offset=0&limit=50
```

parse the return of this call with a npm module

3. Lookup IPFS Hash and pull back image info
```
https://gateway.ipfs.io/ipfs/QmXhqhBZrjUjg1yNj6ofJ1E8RtxXPPYXWSdRAeFcWTsEuq
```

### Get account info

```
GET request https://api.jakartanet.tzkt.io/v1/accounts/tz1Y1eg4zzwzBTFrr7DRmdw2DDZRa339Qw9Y?metadata=true
```
Should return public account info

{
    "id": 218487,
    "type": "user",
    "address": "tz1Y1eg4zzwzBTFrr7DRmdw2DDZRa339Qw9Y",
    "publicKey": "edpkuPDZ28Z2VPjDSksxjkqe9kiETwyjBTfyhqVuWGpo4KReRxopxf",
    "revealed": true,
    "balance": 9475183168,
    "rollupBonds": 0,
    "counter": 395046,
    "numContracts": 7,
    "rollupsCount": 0,
...
