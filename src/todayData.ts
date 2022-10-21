import axios from "axios"

const tzkt = process.env.REACT_APP_TEZOS_API;


export const getContractData = (prop: string, contract: string) => {
  const storageURL = `${tzkt}/v1/contracts/${contract}/storage`
  return axios.get(storageURL).then(response => response.data[prop])
}

export const getIPFSHash = async (id: number) => {
  const bigMapURL = `${tzkt}/v1/bigmaps/${id}/keys?active=true&offset=0&limit=50`;
  const response = await axios.get(bigMapURL)
  return response.data
}

export interface ContractBookData {
  IpfsHash?: string;
  authorName?: string;
  bookType?: string;
  category?: string;
  description: string;
  price: number;
  quantity?: number;
  royalties?: number;
  title: string;
  coverIpfsHash: string;
  bookIpfsHash: string;
}