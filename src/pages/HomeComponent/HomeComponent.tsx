import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import SliderComponent from '../../components/slider/SliderComponent';
import heroSliderProps from '../../assets/fake-data/data-slider';

import TopSeller from '../../components/layouts/home-5/TopSeller';
import TodayPicks from '../../components/layouts/home-5/TodayPicks';
import todayPickData from '../../assets/fake-data/data-today-pick';
import PopularCollection from '../../components/layouts/home-5/PopularCollection';
import Create from '../../components/layouts/home-5/Create-alt';

import './HomeComponent';
import { ContractBookData, getContractData, getIPFSHash } from '../../todayData';
import { Book } from "../../components/layouts/home-5/Book";
import { contract } from '../../App';

// this component will pull its data from the blockchain.
// mock data is being used for no iternent development

// build a mock data model to represent data post blockchain add

// the sass styles are overriding this page also


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
  getContractData('token_metadata', contract).then(id => {
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


  return (
    <div className="home-5">
      <SliderComponent
        data={heroSliderProps.data}
        title={heroSliderProps.title}
        description={heroSliderProps.description}
      />
      {/* <CategorySelect /> */}
      {/* <LiveAuction /> */}
      <TodayPicks data={todayData} />
      {/* <PopularCollection /> */}
      {/* <TopSeller /> */}
      <Create />
      <Footer />
    </div>
  );
};

export default HomeComponent;
