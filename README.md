# Welcome to Bookit!
![logo](https://64.media.tumblr.com/0d1384f5926bf41dfa090ad86595346b/b2c02e89d3182d04-c3/s540x810/ae67933ba43db02d83e4be3c54deee60ba32c230.gif)


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
// node_modules/react-scripts/config/webpack.config.js:308

...
resolve: {
  fallback: { "crypto": require.resolve("crypto-browserify"), "stream": require.resolve("stream-browserify"), "path": require.resolve("path-browserify"),
  "buffer": require.resolve("buffer/") },
  ...

```

You'll need funds for most interactions with smart contracts. The testing for this project is based on Ithacanet

#### Faucet

Access the appropriate faucet start [here](https://teztnets.xyz/)
After downloading the appropriate json file use the tezos-client to send funds to your test account

#### Tezos client CLI

[Tezos client info](https://assets.tqtezos.com/docs/setup/1-tezos-client/)
set tezos-client to a different endpoint
```
tezos-client --endpoint https://jakartanet.tezos.marigold.dev config update
```

#### Testnet Wallet

I use the kukai wallet for testing. This is the link to the ithacanet wallet. Create a new wallet/address here if needed.
[Kukai Ithacanet](https://ithacanet.kukai.app/)

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