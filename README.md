# Welcome to Bookit!
![logo](https://ih1.redbubble.net/image.3109823072.5662/st,small,507x507-pad,600x600,f8f8f8.jpg)


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

#### Testnet Wallet

I use the kukai wallet for testing. This is the link to the ithacanet wallet. Create a new wallet/address here if needed.
[Kukai Ithacanet](https://ithacanet.kukai.app/)

---
## Tezos Documentation

[list of RPC nodes](https://tezostaquito.io/docs/rpc_nodes/)

Usefull info for book authors
[Choosing the right ebook format](https://learn.g2.com/ebook-formats)
