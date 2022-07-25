import axios from "axios"

export const getContractData = (prop: string) => {
  const storageURL = 'https://api.jakartanet.tzkt.io/v1/contracts/KT1DdKVXB6g3gnr3NQByMmJTNX6MDt1UMudY/storage'
  return axios.get(storageURL).then(response => response.data[prop])
}

export const doMore = (id: number) => {
  const bigMapURL = `https://api.jakartanet.tzkt.io/v1/bigmaps/${id}/keys?active=true&offset=0&limit=50`;
  return axios.get(bigMapURL).then(response => response.data)
}