declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production';
      REACT_APP_APOLLO_URL: string;
      REACT_APP_TEZOS_ENDPOINT: string;
      REACT_APP_TEZOS_NETWORK: string;
      REACT_APP_CONTRACT_ROYALTY_ADDRESS: string;
      REACT_APP_ADDRESS_PROXY_MANAGER: string;
      REACT_APP_CONTRACT_EXCHANGE: string;
      REACT_APP_CONTRACT_TRANSFER_MANAGER: string;
      REACT_APP_CONTRACT_ROYALTIES_MANAGER: string;
      REACT_APP_CONTRACT_PUBLIC_NFT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}