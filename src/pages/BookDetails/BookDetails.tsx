import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import liveAuctionData from '../../assets/fake-data/data-live-auction';
// import LiveAuction from '../../components/layouts/LiveAuction';
import img1 from '../../assets/images/avatar/avt-3.jpg';
import img2 from '../../assets/images/avatar/avt-11.jpg';
import img3 from '../../assets/images/avatar/avt-1.jpg';
import img4 from '../../assets/images/avatar/avt-5.jpg';
import img5 from '../../assets/images/avatar/avt-7.jpg';
import img6 from '../../assets/images/avatar/avt-8.jpg';
import ninja from '../../assets/images/avatar/ninja.png';

import { code as transfer_proxy } from '../../global/contracts/exchange-v2/transfer_proxy';
import { code as contractTransferManager } from '../../global/contracts/exchange-v2/transfer_manager';
import { code as exchangeCode } from '../../global/contracts/exchange-v2/exchange';
import { code as royaltiesCode } from '../../global/contracts/exchange-v2/royalties';
import { code as publicNFTCode } from '../../global/contracts/ts/multiple_nft_public';

import './BookDetails.scss';
import { Breadcrumbs } from './Breadcrumbs';
import { getTezosPrice } from './coinPrice';
// import { getContractData, getIPFSHash } from '../../todayData';
import { Book } from '../../components/layouts/home-5/Book';
// import { Contracts } from '../../App';
// import { setNewBookData } from '../HomeComponent/HomeComponent';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { originateContract, marketBuyBook, originatePublicNFT } from '../../global/smartContract';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

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
        <Link to={`/author/${props.id}`}>{props.id}</Link>{' '}
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

const BookDetails = ({ wallet, Tezos, toast }: CreateItemProps) => {
  //TODO: remove mock data

  const [dataHistory] = useState([
    {
      img: img1,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 xtz',
      priceChange: '$12.246',
    },
    {
      img: img2,
      name: 'Mason Woodward',
      time: 'at 06/10/2021, 3:20 AM',
      price: '4.89 xtz',
      priceChange: '$12.246',
    },
    {
      img: img3,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 xtz',
      priceChange: '$12.246',
    },
    {
      img: img4,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 xtz',
      priceChange: '$12.246',
    },
    {
      img: img5,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 xtz',
      priceChange: '$12.246',
    },
    {
      img: img6,
      name: 'Mason Woodward',
      time: '8 hours ago',
      price: '4.89 xtz',
      priceChange: '$12.246',
    },
  ]);

  const [book, setBook] = useState<Book>();

  let { id: bookID } = useParams();

  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    getTezosPrice().then((p) => setPrice(p));
  }, []);

  /*
  useEffect(() => {
    getContractData('token_metadata', Contracts.Exchange).then((id) => {
      //NOTE: This logic is borrowed from HomeComponent:41
      //TODO: clean this by re-use or simplification

      getIPFSHash(id).then((data) => {
        const token = data.filter((_token) => _token.id === Number(bookID))[0];
        const _book = JSON.parse(Object.keys(token.value.token_info)[0]);
        if (_book) setBook(setNewBookData(id, _book));
      });
    });
  }, [bookID]);
  */

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

  // step 1. - transfer proxy
  const originateTransferProxy = async () => {
    const owner = activeAccount?.address;
    if (Tezos) {
      const storage = {
        owner,
        owner_candidate: owner,
        user: [owner],
        metadata,
      };

      await originateContract({ Tezos, storage, code: transfer_proxy });
      console.log('done');
    }
  };

  // step 2. - exchange manager
  const transferMangerOriginate = async () => {
    const owner = activeAccount?.address;
    const fee_receivers = new MichelsonMap();
    fee_receivers.set(owner, owner);

    if (Tezos) {
      const storage = {
        owner,
        default_fee_receiver: owner,
        protocol_fee: 2,
        exchange: [process.env.REACT_APP_CONTRACT_EXCHANGE],
        transfer_proxy: process.env.REACT_APP_CONTRACT_TRANSFER_MANAGER,
        fee_receivers,
        metadata,
      };

      await originateContract({ Tezos, storage, code: contractTransferManager });
      console.log('done');
    }
  };

  // step 3 - exchange
  const originateExchange = async () => {
    const owner = activeAccount?.address;
    const metadata = new MichelsonMap();

    if (Tezos) {
      const storage = {
        owner,
        transfer_manager: 'KT1WjLWQS9R34mWySsrnE3L28bxcuvEHHyzL',
        royalties: 'tz1ZiNYG7hxDFome58tuu6CTRm9Mc1R7bxuV',
        fill: 'tz1ZiNYG7hxDFome58tuu6CTRm9Mc1R7bxuV',
        paused: false,
        metadata,
      };

      await originateContract({ Tezos, storage, code: exchangeCode });
      console.log('done');
    }
  };

  // step 4 - royalties
  const royaltiesOriginate = async () => {
    const owner = activeAccount?.address;

    const royalties = new MichelsonMap();
    royalties.set([owner, 100], [{ partAccount: owner, partValue: 2 }]);
    const metadata = new MichelsonMap();

    if (Tezos) {
      const storage = {
        owner,
        user: [owner],
        royalties,
        metadata,
      };
      await originateContract({ Tezos, storage, code: royaltiesCode });
      console.log('done');
    }
  };

  const publicNFTOriginate = async () => {
    if (!Tezos ) return
      await originatePublicNFT({ Tezos, nftInfo: {}, owner: process.env.REACT_APP_ADDRESS_PROXY_MANAGER });
      console.log('done');
  };

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
              </div>

              <div className="description topBar">
                <h6>Description </h6>
                <p>{book?.description}</p>
              </div>

              <div className="row details topBar" style={{ display: 'none' }}>
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
              <div className="row justify-content-between publishRow">
              <Button
                className="sc-button col-md-3"
                onClick={originateTransferProxy}
              >
                <span>Transfer Proxy</span>
              </Button>
              <Button
                className="sc-button col-md-3"
                onClick={originateExchange}
              >
                <span>Gen Exchange</span>
              </Button>
              <Button
                className="sc-button col-md-3"
                onClick={transferMangerOriginate}
              >
                <span>Transfer Manager</span>
              </Button>
              <Button
                className="sc-button col-md-3"
                onClick={royaltiesOriginate}
              >
                <span>Royalties</span>
              </Button>
              <Button
                className="sc-button col-md-3"
                onClick={publicNFTOriginate}
              >
                <span>Public NFT Contract</span>
              </Button>
              </div>

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
      {/* <LiveAuction data={liveAuctionData} /> */}
    </div>
  );
};

export default BookDetails;
