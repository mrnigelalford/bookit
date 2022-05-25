import React from 'react'
import Footer from '../components/footer/Footer'
import SliderComponent from '../components/slider/SliderComponent'
import heroSliderData from '../assets/fake-data/data-slider'
import LiveAuction from '../components/layouts/home-5/LiveAuction'
import TopSeller from '../components/layouts/home-5/TopSeller'
import TodayPicks from '../components/layouts/home-5/TodayPicks'
import todayPickData from '../assets/fake-data/data-today-pick'
import PopularCollection from '../components/layouts/home-5/PopularCollection'
import Create from '../components/layouts/home-5/Create-alt'

const HomeComponent = () => {
  return (
    <div className="home-5">
      <SliderComponent data={heroSliderData} />
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

export default HomeComponent
