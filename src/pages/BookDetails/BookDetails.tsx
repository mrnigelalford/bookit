import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import liveAuctionData from '../../assets/fake-data/data-live-auction';
// import LiveAuction from '../../components/layouts/LiveAuction';
import ninja from '../../assets/images/avatar/user.png';

import './BookDetails.scss';

// import { getContractData, getIPFSHash } from '../../todayData';

// import { Contracts } from '../../App';
// import { setNewBookData } from '../HomeComponent/HomeComponent';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { marketBuyBook } from '../../global/smartContract';
import { Link, useParams } from 'react-router-dom';
import { getContractData, getIPFSHash } from '../../todayData';
import { setNewBookData } from '../../pages/HomeComponent/HomeComponent';
import { mockDataHistory } from '../../assets/fake-data/mockData';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Book } from '../../components/layouts/home-5/Book';
import { getTezosPrice } from '../../components/Breadcrumbs/coinPrice';
import { truncateString } from '../../components/BookCard/BookCard';
import { stringify } from 'querystring';


interface OwnerProps {
  img?: string;
  name?: string;
  id?: string;
  title: string;
  className?: string;
  children?: React.ReactChild;
}

interface PriceProps {
  book: any;
  currentPrice: number;
  className: string;
}

interface CreateItemProps {
  wallet?: BeaconWallet;
  Tezos?: TezosToolkit;
  toast: any;
}

// TODO: Re-add this component once the supporting DB logic is added
// const LikesComponent = () => {
//   return (
//     <div className="right">
//       <span className="viewed eye mg-r-8">225</span>
//       <span data-to="/login" className="liked heart wishlist-button">
//         <span className="number-like">100</span>
//       </span>
//     </div>
//   );
// };

const metadata = new MichelsonMap();

const OwnerComponent = (props: OwnerProps) => (
  <div className={'author ' + props.className}>
    <img className="avatar" src={props.img || ninja} alt="Axies" />
    <div className="info">
      <h6>{props.title}</h6>
      <p>
        {' '}
        <Link to={`/author/${props.id}`}>{props.name}</Link>{' '}
      </p>
    </div>

    {props.children}
  </div>
);

const PriceComponent = (props: PriceProps) => {
  return (
    <div className={props.className}>
      <h6>Price</h6>
      <div className="price-box">
        <p>
          {' '}
          {Number(props.book.price)}
          {'xtz '}
          <small>{`($ ${(props.currentPrice * Number(props.book.price)).toFixed(
            2
          )})`}</small>{' '}
        </p>
      </div>
    </div>
  );
};

const BidHistoryComponent = (dataHistory) => (
  <div className="flat-tabs themesflat-tabs topBar">
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
)

const InfoComponent = () => (
  <div className="row details topBar">
    {/* <h6>Tech Details </h6> */}
    <div className="col-6">
      <h6>Artist</h6>
      <p>Ralph Garraway</p>{' '}
    </div>
    <div className="col-6">
      <h6>Collection</h6>
      <p>Cyberpunk City Art</p>{' '}
    </div>
    <div className="col-6">
      <h6>Size</h6>
      <p>3000 x 3000</p>{' '}
    </div>
    <div className="col-6">
      <h6>Create Date</h6>
      <p>04 April , 2021</p>{' '}
    </div>
  </div>
);

const BookDetails = ({ wallet, Tezos, toast }: CreateItemProps) => {
  const [dataHistory] = useState(mockDataHistory);

  const [book, setBook] = useState<Book>();

  let { id: bookID } = useParams();

  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    getTezosPrice().then((p) => setPrice(p));
  }, []);

  useEffect(() => {
    getContractData('token_metadata', process.env.REACT_APP_CONTRACT_PUBLIC_NFT).then((id) => {
      getIPFSHash(id).then((data) => {
        const token = data.filter((_token) => _token.id === Number(bookID))[0];
        const _book = JSON.parse(Object.keys(token.value.token_info)[0]);
        if (_book) {
          _book.authorName = truncateString(_book.authorName, 10);
          setBook(setNewBookData(id, _book)); // transform book props, this should be refactored
        }
      });
    });
  }, [bookID]);


  useEffect(() => {
    wallet?.client.getActiveAccount().then((activeAccount) => {
      if (activeAccount) {
        setActiveAccount(activeAccount);
      }
    });
  }, [wallet]);

  const [activeAccount, setActiveAccount] = useState<any>();

  const buyBook = async () => {
    // toast.info('Starting mint....page will go home upon completion', {
    //   position: toast.POSITION.TOP_CENTER,
    //   hideProgressBar: false,
    //   autoClose: 8000,
    // });

    await marketBuyBook({ Tezos, activeAccount, wallet });
    // toast.success('Confirmations have completed, congrats!', {
    //   position: toast.POSITION.TOP_CENTER,
    //   pauseOnHover: true,
    // });
  };

  interface InputComponentProps {
    title: String;
    className: string;
  }

  const InputComponent = (props: InputComponentProps) => (
    <div className={props.className}>
      <h4 className="title-create-book">{props.title}</h4>
      <input
        type="number"
        placeholder="5%"
        value={10}
        onBlur={(e) => {}}
      />
    </div>
  )

  return (
    <div className="item-details pageBody">
      <Breadcrumbs header="Book Details" />
      <div className="tf-section tf-item-details style-2">
        <div className="themesflat-container">
          <div className="row">
            {/* cover image */}
            <div className="col-sm-6 col-l-12 coverImage">
              <img
                src={book?.img}
                style={{ marginBottom: '1em' }}
                alt="Axies"
              />
              <div style={{ paddingLeft: '1em' }}>
                {/* {book.bonusContent && book.bonusContent.frontCover && (
                  <div className="col-3">
                  <img src={book.bonusContent.frontCover} alt="Axies" />
                  </div>
                )} */}
                {/* <h4 style={{ marginBottom: '1em' }}>Additional Images</h4> */}
                {book?.bonusContent && book.bonusContent.backCover && (
                  <div style={{ display: 'inline-block' }}>
                    <img
                      style={{ marginBottom: '2em' }}
                      src={book.bonusContent.backCover}
                      alt="Axies"
                    />
                    <h6>back cover</h6>
                  </div>
                )}
                {book?.bonusContent && book.bonusContent.exerpts.length && (
                  <div style={{ display: 'inline-block' }}>
                    {book.bonusContent.exerpts.slice(0, 3).map((b, i) => (
                      <div
                        style={{
                          display: 'inline-block',
                          width: '8em',
                          marginLeft: '4em',
                        }}
                      >
                        <img
                          style={{ marginBottom: '2em' }}
                          src={b.img}
                          alt="Axies"
                        />
                        <h6>excerpt {i}</h6>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* /cover image */}
            <div className="col-sm-6 col-l-12 metadata">
              <h2>{book?.title}</h2>

              <div className="topBar">
                <OwnerComponent
                  img={book?.imgAuthor}
                  name={book?.AuthorId}
                  id={book?.nameAuthor}
                  title="Owned By"
                  className="col-12"
                />
                <OwnerComponent
                  img={ninja}
                  name={book?.AuthorId}
                  id={book?.id}
                  title="Created By"
                  className="col-12"
                >
                  {book && (
                    <PriceComponent
                      book={book}
                      currentPrice={price}
                      className="priceComponent"
                    />
                  )}
                </OwnerComponent>
                <div className="row buyRow">
                  <InputComponent className="col-4" title="Buy" />
                  <button className="btn-Mint" onClick={() => {}}> Buy Book </button>
                </div>

              </div>

              <div className="description topBar">
                <h6>Description </h6>
                <p>{book?.description}</p>
              </div>
              {/* <InfoComponent /> */}
              {/* <BidHistoryComponent dataHistory={dataHistory} /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <LiveAuction data={liveAuctionData} /> */}
    </div>
  );
};

export default BookDetails;
