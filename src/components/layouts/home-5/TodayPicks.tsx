import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardModal from '../CardModal';
import FilterComponent from './FilterComponent';
import BookCards from './BookCard';
import { Book } from "./Book";

const TodayPicks = (props: {data: Book[]}) => {
  
  const data = props.data;
  
  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  
  const [modalShow, setModalShow] = useState(false);

  if(!props.data) return (<></>)
  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12 heading-live-auctions mg-bt-21">
              <h2 className="tf-title">Today's Picks</h2>
              <Link to="/explore" className="exp style2">
                EXPLORE MORE
              </Link>
            </div>
            {/* <FilterComponent /> */}
            <BookCards
              books={data}
              maxCards={visible}
              cardClassName="col-xl-3 col-lg-4 col-md-4 col-sm-6"
            />
            {visible < data.length && (
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
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

TodayPicks.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TodayPicks;
