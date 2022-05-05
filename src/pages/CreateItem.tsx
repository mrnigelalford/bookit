import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Countdown from 'react-countdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import avt from '../assets/images/avatar/avt-9.jpg';
import { Button, Dropdown } from 'react-bootstrap';
import { pinFileToIPFS } from '../global/pinata';
import { Originate } from '../global/smartContract';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';

enum BookType {
  epub = 'epub',
  mobi = 'mobi',
  // txt = 'txt',
  // azw = 'azw',
  // azw3 = 'azw3',
  // azw4 = 'azw4',
  // pdf = 'pdf'
}

interface UploadProps {
  title: string;
  description: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

interface CreateItemProps {
  wallet?: BeaconWallet;
  Tezos?: TezosToolkit;
}

const CreateItem = ({ wallet, Tezos }: CreateItemProps) => {
  const [fileSelected, setFileSelected] = useState<File>(); // also tried <string | Blob>
  const [bookUpload, setBookUpload] = useState<File>(); // also tried <string | Blob>
  const [fileName, setFileName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [title, setTitle] = useState<string | null>('Sample Title');
  const [description, setDescription] = useState<string | null>();
  const [category, setCategory] = useState<string>();
  const [bookType, setBookType] = useState<BookType>(BookType.epub);
  const [royalties, setRoyalty] = useState<number>(2);
  const [quantity, setQuantity] = useState<number>(1);
  const [authorName, setAuthorName] = useState<string>();

  const categories = [
    'Abstraction',
    'Art',
    'Music',
    'Domain',
    'Virtual',
    'Trading',
    'Sports',
    'Utility',
  ];

  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setFileSelected(fileList[0]);
  };

  const handleBookUpload = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setBookUpload(fileList[0]);
  };

  const mintForm = async () => {
    let formData = new FormData();
    if (fileSelected) formData.append('file', fileSelected);
    if (price) formData.append('price', price.toString());
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    if (category) formData.append('category', category);
    formData.append('bookType', bookType);

    // send form to IPFS
    if (formData.has('file')) {
      const { data } = await pinFileToIPFS(formData);
      console.log('ipfs: ', data);
      const nftInfo = {
        IpfsHash: data.IpfsHash,
        price,
        title,
        description,
        category,
        bookType,
        royalties,
        quantity,
        authorName,
      };

      if (Tezos) {
        Originate({ Tezos, nftInfo, owner: 'abcd1234' });
      }
    }
  };

  const FileUpload: React.FC<UploadProps> = (props: UploadProps) => (
    <form style={{ marginTop: '1em' }} action="#">
      <h4 className="title-create-item">{props.title}</h4>
      <label className="uploadFile" style={{ padding: '2em' }}>
        <p
          className="filename"
          style={{ width: '65%', overflowWrap: 'break-word' }}
        >
          {props.description}
        </p>
        <input
          type="file"
          className="inputfile form-control"
          name="fileUpload"
          onChange={props.onChange}
          style={{ right: '1em' }}
        />
      </label>
    </form>
  );

  const CategoryDropdown: React.FC = () => (
    <Dropdown
      id="categoryDropdown"
      onSelect={(e, ob) => {
        setCategory(ob.target['textContent']);
      }}
      style={{ lineHeight: '44px' }}
    >
      <Dropdown.Toggle
        className="dropdown"
        style={{ padding: '.6em', fontSize: 'large', borderRadius: '8px' }}
      >
        {category || 'Category'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {categories.map((cat) => (
          <Dropdown.Item>{cat}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  const BookFormatPicker: React.FC = () => (
    <Dropdown
      id="outputDropdown"
      onSelect={(e, ob) => {
        setBookType(ob.target['textContent']);
      }}
      style={{ lineHeight: '44px' }}
    >
      <Dropdown.Toggle
        className="dropdown"
        style={{ padding: '.6em', fontSize: 'large', borderRadius: '8px' }}
      >
        {bookType || BookType.epub}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(BookType).map((format) => (
          <Dropdown.Item>{BookType[format]}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  // const uploadFile = function (
  //   e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  // ) {
  //   if (fileSelected) {
  //     const formData = new FormData();
  //     formData.append('image', fileSelected, fileSelected.name);
  //   }
  // };

  // const Breadcrumbs: React.FC = () => (
  //   <div className="breadcrumbs style2">
  //     <ul>
  //       <li>
  //         <Link to="/">Home</Link>
  //       </li>
  //       <li>
  //         <Link to="#">Pages</Link>
  //       </li>
  //       <li>Create Item</li>
  //     </ul>
  //   </div>
  // );

  return (
    <div className="create-item">
      <section className="flat-title-page inner">
        <h1 className="heading text-center">Create Item</h1>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 className="title-create-item">Preview item</h4>
              <div className="sc-card-product">
                <div className="card-media">
                  {fileSelected && (
                    <img src={URL.createObjectURL(fileSelected)} alt="Axies" />
                  )}
                  <Link to="/login" className="wishlist-button heart">
                    <span className="number-like"> 100</span>
                  </Link>
                  <div className="featured-countdown">
                    <span className="slogan"></span>
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div>
                </div>
                <div className="card-title">
                  <h5>{title}</h5>
                  <div className="tags">bsc</div>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={avt} alt="Axies" />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {' '}
                        <Link to="/author-02">Freddie Carpenter</Link>
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Current Bid</span>
                    <h5> 4.89 ETH</h5>
                  </div>
                </div>
                <div className="card-bottom">
                  <Link
                    to="/wallet-connect"
                    className="sc-button style bag fl-button pri-3"
                  >
                    <span>Place Bid</span>
                  </Link>
                  <Link to="/activity-01" className="view-history reload">
                    View History
                  </Link>
                </div>
              </div>
              <button
                style={{
                  width: '100%',
                  height: '4em',
                  borderRadius: '1em',
                }}
                className="sc-button style bag fl-button pri-3"
                onClick={() => mintForm()}
              >
                Mint Book
              </button>
            </div>
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <FileUpload
                  title="Upload Cover Art"
                  description={
                    fileSelected?.name || '.pdf. .docx, or .txt. Max 200mb.'
                  }
                  onChange={handleFileChange}
                />
                <div className="flat-tabs tab-create-item">
                  <h4 className="title-create-item">Select method</h4>
                  <Tabs>
                    <TabList>
                      <Tab>
                        <span className="icon-fl-tag"></span>Fixed Price
                      </Tab>
                      <Tab>
                        <span className="icon-fl-clock"></span>Time Auctions
                      </Tab>
                      <Tab>
                        <span className="icon-fl-icon-22"></span>Open For Bids
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <form action="#">
                        <div className="row">
                          <div className="col-4">
                            <h4 className="title-create-item">Price</h4>
                            <input
                              type="number"
                              style={{ backgroundColor: 'transparent' }}
                              placeholder="Enter price for one item (xtz)"
                              onChange={() => setPrice}
                            />
                          </div>
                          <div className="col-4">
                            <h4 className="title-create-item">Royalties</h4>
                            <input
                              type="number"
                              placeholder="5%"
                              value={royalties}
                              onChange={(e) =>
                                setRoyalty(Number(e.target.value))
                              }
                            />
                          </div>

                          <div className="col-4">
                            <h4 className="title-create-item">Quantity</h4>
                            <input
                              type="number"
                              placeholder="e.g. “# of books to be minted”"
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Number(e.target.value))
                              }
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input
                          type="text"
                          placeholder="Item Name"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />

                        <h4 className="title-create-item">Description</h4>
                        <textarea
                          placeholder="e.g. “This is very limited item”"
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <div
                          className="row-form style-3"
                          style={{
                            justifyContent: 'revert',
                            flexDirection: 'row-reverse',
                          }}
                        >
                          <div className="col-4" style={{ padding: 'revert' }}>
                            <h4 className="title-create-item">eBook Format</h4>
                            <BookFormatPicker />
                          </div>
                          <div
                            className="col-4"
                            style={{ padding: 'revert', marginRight: '2em' }}
                          >
                            <h4 className="title-create-item">Category</h4>
                            <CategoryDropdown />
                          </div>
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-item">Price</h4>
                        <input
                          type="number"
                          placeholder="Enter price for one item (xtz)"
                        />

                        <h4 className="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />

                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-item">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date2"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date2"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <h4 className="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateItem;
