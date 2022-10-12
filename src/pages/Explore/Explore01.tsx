import React from 'react'
import TodayPicks from '../../components/layouts/explore-01/TodayPicks'
import todayPickData from '../../assets/fake-data/data-today-pick'
import { Breadcrumbs } from '../BookDetails/Breadcrumbs'

const Explore01 = () => {
  return (
    <div>
      <Breadcrumbs header="Explore" />
      <TodayPicks data={todayPickData} />
    </div>
  )
}

export default Explore01
