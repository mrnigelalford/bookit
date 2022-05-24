import React from 'react'
import Footer from '../components/footer/Footer'
import SliderStyle2 from '../components/slider/SliderStyle2'
import heroSliderData from '../assets/fake-data/data-slider'
import LiveAuction from '../components/layouts/home-5/LiveAuction'
import TopSeller from '../components/layouts/home-5/TopSeller'
import TodayPicks from '../components/layouts/home-5/TodayPicks'
import todayPickData from '../assets/fake-data/data-today-pick'
import PopularCollection from '../components/layouts/home-5/PopularCollection'
import Create from '../components/layouts/home-5/Create-alt'

const Home05 = () => {
  return (
    <div className="home-5">
      <SliderStyle2 data={heroSliderData} />
      {/* <CategorySelect /> */}
      {/* <LiveAuction /> */}
      <TodayPicks data={todayPickData} />
      <PopularCollection />
      <TopSeller />
      <Create />
      <Footer />
    </div>
  )
}

export default Home05
