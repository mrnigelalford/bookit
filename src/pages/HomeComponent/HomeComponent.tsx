import React, { useEffect, useState } from 'react';
import SliderComponent, { SliderImage } from '../../components/slider/SliderComponent';

import TodayPicks from '../../components/layouts/home-5/TodayPicks';
import Create from '../../components/layouts/home-5/Create-alt';

import './HomeComponent';
import { ContractBookData, getContractData, getIPFSHash } from '../../todayData';
import { Book } from "../../components/layouts/home-5/Book";

// this component will pull its data from the blockchain.
// the sass styles are overriding this page also

const HeroSliderProps = {
  title: 'Discover your next favorite author',
  description: 'book NFT Marketplace',
};

export const setNewBookData = (id: string, metadata: ContractBookData): Book => ({
  id,
  img: `https://gateway.ipfs.io/ipfs/${metadata.IpfsHash || metadata.coverIpfsHash}`,
  title: metadata.title,
  AuthorId: metadata.authorName || '',
  nameAuthor: metadata.authorName || '',
  price: metadata.price,
  description: metadata.description
})

const HomeComponent = () => {
const [todayData, setTodayData] = useState<Book[]>([]);


useEffect(() => {
  getContractData('token_metadata', process.env.REACT_APP_CONTRACT_PUBLIC_NFT).then(id => {
    const _books: Book[] = [];
    getIPFSHash(id).then(data => {
      data.forEach(token => {
        const _book = JSON.parse(Object.keys(token.value.token_info)[0]);
        _books.push(setNewBookData(token.id, _book))
      })
      if(_books.length) setTodayData(_books)
    })
  });
}, [])

const setSliderImage = (books: Book[]): SliderImage[] => {
  const _images: SliderImage[] = [];  

  books.forEach(book => {
    if(book.img && book.title) {
      _images.push({
        title: book.title,
        img: book.img
      })
    }
  })
  return _images;
}


  return (
    <div className="home-5">
      <SliderComponent
        data={setSliderImage(todayData)}
        title={HeroSliderProps.title}
        description={HeroSliderProps.description}
      />
      {/* <CategorySelect /> */}
      {/* <LiveAuction /> */}
      <TodayPicks data={todayData} />
      {/* <PopularCollection /> */}
      {/* <TopSeller /> */}
      <Create />
    </div>
  );
};

export default HomeComponent;
