import React from 'react'
import TodayPicks from '../../components/TodaysPicks/TodayPicks'
import todayPickData from '../../assets/fake-data/data-today-pick'
import { Breadcrumbs } from '../BookDetails/Breadcrumbs'

const Explore = () => {
  return (
    <div id="explore" className="explore pageBody">
      <Breadcrumbs header="Explore" />
      <TodayPicks data={todayPickData} />
    </div>
  )
}

export default Explore
