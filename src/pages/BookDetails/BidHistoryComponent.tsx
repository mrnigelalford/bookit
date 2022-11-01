import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import ninja from '../../assets/images/avatar/user.png';
import { stringify } from 'querystring';
import { mockDataHistory } from '../../assets/fake-data/mockData';

interface BidProps {
  history: any;
}

export const BidHistoryComponent = (props: BidProps) => {

  // use this for mock data in the short term. it should be passed into the component instead of declared here.
  const [dataHistory] = useState(mockDataHistory);

  return (
  <div className="flat-tabs themesflat-tabs topBar">
    <Tabs>
      <TabList>
        <Tab>Bid History</Tab>
        <Tab>Info</Tab>
        <Tab>Provenance</Tab>
      </TabList>

      <TabPanel>
        <ul className="bid-history-list">
          {props.history.map((item, index) => (
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
                        src={ninja}
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
)}