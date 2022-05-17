# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

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

## Tezos Documentation

[list of RPC nodes](https://tezostaquito.io/docs/rpc_nodes/)

Usefull info for book authors
[Choosing the right ebook format](https://learn.g2.com/ebook-formats)
