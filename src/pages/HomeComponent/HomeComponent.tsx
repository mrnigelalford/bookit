import React from 'react';
import Footer from '../../components/footer/Footer';
import SliderComponent from '../../components/slider/SliderComponent';
import heroSliderProps from '../../assets/fake-data/data-slider';

import TopSeller from '../../components/layouts/home-5/TopSeller';
import TodayPicks from '../../components/layouts/home-5/TodayPicks';
import todayPickData from '../../assets/fake-data/data-today-pick';
import PopularCollection from '../../components/layouts/home-5/PopularCollection';
import Create from '../../components/layouts/home-5/Create-alt';

import './HomeComponent';
import { doMore, getContractData } from '../../todayData';

// this component will pull its data from the blockchain.
// mock data is being used for no iternent development

// build a mock data model to represent data post blockchain add

// the sass styles are overriding this page also

const HomeComponent = () => {
getContractData('token_metadata').then(id => {
  doMore(id).then(data => {

    //pass this over to the covnerter
    console.log('stuff: ', data[0].value);
  })
});

  return (
    <div className="home-5">
      <SliderComponent
        data={heroSliderProps.data}
        title={heroSliderProps.title}
        description={heroSliderProps.description}
      />
      {/* <CategorySelect /> */}
      {/* <LiveAuction /> */}
      <TodayPicks data={todayPickData} />
      {/* <PopularCollection /> */}
      {/* <TopSeller /> */}
      <Create />
      <Footer />
    </div>
  );
};

export default HomeComponent;
