import React, { useState } from 'react';
import Footer from '../../components/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import Countdown from 'react-countdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import liveAuctionData from '../../assets/fake-data/data-live-auction';
import LiveAuction from '../../components/layouts/LiveAuction';
import img1 from '../../assets/images/avatar/avt-3.jpg';
import img2 from '../../assets/images/avatar/avt-11.jpg';
import img3 from '../../assets/images/avatar/avt-1.jpg';
import img4 from '../../assets/images/avatar/avt-5.jpg';
import img5 from '../../assets/images/avatar/avt-7.jpg';
import img6 from '../../assets/images/avatar/avt-8.jpg';
import img7 from '../../assets/images/avatar/avt-2.jpg';
import ninja from '../../assets/images/avatar/ninja.png';
import todayPickData from '../../assets/fake-data/data-today-pick';

import './ItemDetails.scss';
import { Breadcrumbs } from './Breadcrumbs';

interface OwnerProps {
  img: string;
  name: string;
  id: string;
  title: string;
}

// TODO: Re-add this component once the supporting DB logic is added
const LikesComponent = () => {
  return (
    <div className="right">
      <span className="viewed eye mg-r-8">225</span>
      <span data-to="/login" className="liked heart wishlist-button">
        <span className="number-like">100</span>
      </span>
    </div>
  );
};

const OwnerComponent = (props: OwnerProps) => (
  <div className="meta-info">
    <div className="author">
      <img className="avatar" src={props.img || ninja} alt="Axies" />
      <div className="info">
        <span>{props.title}</span>
        <h6>
          {' '}
          <Link to={`/author/${props.id}`}>{props.id}</Link>{' '}
        </h6>
      </div>
    </div>
  </div>
);

const ItemDetails02 = () => {
  const [dataHistory] = useState([
    {
      img: img1,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 ETH',
      priceChange: '$12.246',
    },
    {
      img: img2,
      name: 'Mason Woodward',
      time: 'at 06/10/2021, 3:20 AM',
      price: '4.89 ETH',
      priceChange: '$12.246',
    },
    {
      img: img3,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 ETH',
      priceChange: '$12.246',
    },
    {
      img: img4,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 ETH',
      priceChange: '$12.246',
    },
    {
      img: img5,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 ETH',
      priceChange: '$12.246',
    },
    {
      img: img6,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 ETH',
      priceChange: '$12.246',
    },
  ]);

  let { id } = useParams();

  const book = todayPickData.filter((b) => b.id === id)[0];
  if (book) {
    console.log('fb: ', book);
  }

  return (
    <div className="item-details">
      <section className="flat-title-page inner">
        <div className="themesflat-container">
          <Breadcrumbs />
          <h1 className="heading text-center">Book Details</h1>
        </div>
      </section>
      <div className="tf-section tf-item-details style-2">
        <div className="themesflat-container">
          <div className="row">
            {/* cover image */}
            <img className="col-sm-6 col-l-12" src={book.img} alt="Axies" />
            {/* /cover image */}
            <div className="col-sm-6 col-l-12 metadata">
              <h2>{book.title}</h2>
              <div className="client-infor sc-card-product">
                <OwnerComponent
                  img={book.imgAuthor}
                  name={book.nameAuthor}
                  id={book.nameAuthor}
                  title="Owned By"
                />
                <OwnerComponent
                  img={ninja}
                  name={'Freddie-Carpenter'}
                  id={'Freddie-Carpenter'}
                  title="Created By"
                />
              </div>
              <p>
                Habitant sollicitudin faucibus cursus lectus pulvinar dolor non
                ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed
                ipsum vitae ipsum malesuada. Habitant sollicitudin faucibus
                cursus lectus pulvinar dolor non ultrices eget. Facilisi
                lobortisal morbi fringilla urna amet sed ipsum
              </p>
              <div className="row">
                <div className="col-3">
                  <h6>Artist : </h6>
                  <p>Ralph Garraway</p>{' '}
                </div>
                <div className="col-3">
                  <h6>Size : </h6>
                  <p>3000 x 3000</p>{' '}
                </div>
                <div className="col-3">
                  <h6>Create : </h6>
                  <p>04 April , 2021</p>{' '}
                </div>
                <div className="col-3">
                  <h6>Collection : </h6>
                  <p>Cyberpunk City Art</p>{' '}
                </div>
                <div className="item-style-2">
                  <div className="item meta-price">
                    <span className="heading">Current Bid</span>
                    <div className="price">
                      <div className="price-box">
                        <h5> 4.89 ETH</h5>
                        <span>= $12.246</span>
                      </div>
                    </div>
                  </div>
                  <div className="item count-down">
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div>
                </div>
              </div>
              <Link
                to="/wallet-connect"
                className="sc-button loadmore style bag fl-button pri-3"
              >
                <span>Place a bid</span>
              </Link>
              <div className="flat-tabs themesflat-tabs">
                <Tabs>
                  <TabList>
                    <Tab>Bid History</Tab>
                    <Tab>Info</Tab>
                    <Tab>Provenance</Tab>
                  </TabList>

                  <TabPanel>
                    <ul className="bid-history-list">
                      {dataHistory.map((item, index) => (
                        // @ts-ignore
                        <li key={index} item={item}>
                          <div className="content">
                            <div className="client">
                              <div className="sc-author-box style-2">
                                <div className="author-avatar">
                                  <Link to="#">
                                    <img
                                      src={item.img}
                                      alt="Axies"
                                      className="avatar"
                                    />
                                  </Link>
                                  <div className="badge"></div>
                                </div>
                                <div className="author-infor">
                                  <div className="name">
                                    <h6>
                                      <Link to="/author-02">{item.name} </Link>
                                    </h6>{' '}
                                    <span> place a bid</span>
                                  </div>
                                  <span className="time">{item.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="price">
                              <h5>{item.price}</h5>
                              <span>= {item.priceChange}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <ul className="bid-history-list">
                      <li>
                        <div className="content">
                          <div className="client">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <Link to="#">
                                  <img
                                    src={img1}
                                    alt="Axies"
                                    className="avatar"
                                  />
                                </Link>
                                <div className="badge"></div>
                              </div>
                              <div className="author-infor">
                                <div className="name">
                                  <h6>
                                    {' '}
                                    <Link to="/author-02">Mason Woodward </Link>
                                  </h6>{' '}
                                  <span> place a bid</span>
                                </div>
                                <span className="time">8 hours ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <div className="provenance">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LiveAuction data={liveAuctionData} />
      <Footer />
    </div>
  );
};

export default ItemDetails02;
