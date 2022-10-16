import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CardModal from '../layouts/CardModal'

import './TodayPicks.scss'
import { BookCard } from '../layouts/home-5/BookCard'

const TodayPicks = (props) => {
  const data = props.data

  const [visible, setVisible] = useState(4)
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4)
  }

  const [modalShow, setModalShow] = useState(false)

  const FilterComponent = () => {
    return (
      <div className="col-md-12">
        <div className="wrap-box explore-1 flex mg-bt-40">
          <div className="seclect-box style-1">
            <div id="item_category" className="dropdown">
              <Link to="#" className="btn-selector nolink">
                All categories
              </Link>
              <ul>
                <li>
                  <span>Art</span>
                </li>
                <li className="active">
                  <span>Music</span>
                </li>
                <li>
                  <span>Domain Names</span>
                </li>
                <li>
                  <span>Virtual World</span>
                </li>
                <li>
                  <span>Trading Cards</span>
                </li>
                <li>
                  <span>Sports</span>
                </li>
                <li>
                  <span>Utility</span>
                </li>
              </ul>
            </div>
            <div id="buy" className="dropdown">
              <Link to="#" className="btn-selector nolink">
                Buy Now
              </Link>
              <ul>
                <li>
                  <span>On Auction</span>
                </li>
                <li>
                  <span>Has Offers</span>
                </li>
              </ul>
            </div>
            <div id="all-items" className="dropdown">
              <Link to="#" className="btn-selector nolink">
                All Items
              </Link>
              <ul>
                <li>
                  <span>Single Items</span>
                </li>
                <li>
                  <span>Bundles</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="seclect-box style-2 box-right">
            <div id="artworks" className="dropdown">
              <Link to="#" className="btn-selector nolink">
                All Artworks
              </Link>
              <ul>
                <li>
                  <span>Abstraction</span>
                </li>
                <li>
                  <span>Skecthify</span>
                </li>
                <li>
                  <span>Patternlicious</span>
                </li>
                <li>
                  <span>Virtuland</span>
                </li>
                <li>
                  <span>Papercut</span>
                </li>
              </ul>
            </div>
            <div id="sort-by" className="dropdown">
              <Link to="#" className="btn-selector nolink">
                Sort by
              </Link>
              <ul>
                <li>
                  <span>Top rate</span>
                </li>
                <li>
                  <span>Mid rate</span>
                </li>
                <li>
                  <span>Low rate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      {/* <section className="tf-section sc-explore-1">
        <div className="themesflat-container"> */}
      <div className="row">
        <FilterComponent />
        <div className="row col-md-12 bookGrid">
          {data.slice(0, visible).map((item, index) => (
              <BookCard book={item} key={index} cardClassName="col-xl-3 col-lg-4 col-md-6 col-sm-6" />
          ))}
          {visible > data.length && (
            <div className="col-md-12 wrap-inner load-more text-center">
              <Link
                to="#"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={showMoreItems}
              >
                <span>Load More</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* </div>
      </section> */}
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  )
}

TodayPicks.propTypes = {
  data: PropTypes.array.isRequired,
}

export default TodayPicks
