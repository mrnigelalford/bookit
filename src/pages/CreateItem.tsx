import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Countdown from 'react-countdown';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import avt from '../assets/images/avatar/avt-9.jpg';
import { Dropdown } from 'react-bootstrap';
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
  onBlur: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

interface CreateItemProps {
  wallet?: BeaconWallet;
  Tezos?: TezosToolkit;
}

const CreateItem = ({ wallet, Tezos }: CreateItemProps) => {
  const [fileSelected, setFileSelected] = useState<File>(); // also tried <string | Blob>
  const [bookUpload, setBookUpload] = useState<File>(); // also tried <string | Blob>
  const [fileName, setFileName] = useState<string>();
  const [price, setPrice] = useState<number>(100);
  const [title, setTitle] = useState<string | null>('Sample Title');
  const [description, setDescription] = useState<string | null>(
    'picture perfect description'
  );
  const [category, setCategory] = useState<string>('Art');
  const [bookType, setBookType] = useState<BookType>(BookType.epub);
  const [royalties, setRoyalty] = useState<number>(2);
  const [quantity, setQuantity] = useState<number>(1);
  const [authorName, setAuthorName] = useState<string>('test author');
  const [activeAccount, setActiveAccount] = useState<any>();

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
    // if (formData.has('file')) {
    // const { data } = await pinFileToIPFS(formData);
    // console.log('ipfs: ', data);
    const nftInfo = {
      IpfsHash: 'mockHash', // data.IpfsHash,
      price,
      title,
      description,
      category,
      bookType,
      royalties,
      quantity,
      authorName,
    };

    if (Tezos && activeAccount) {
      Originate({ Tezos, nftInfo, owner: activeAccount?.address });
    }
    // }
  };

  const FileUpload: React.FC<UploadProps> = (props: UploadProps) => (
    <form style={{ marginTop: '1em' }} action="#">
      <h4 className="title-create-book">{props.title}</h4>
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
          onBlur={props.onBlur}
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
          <Dropdown.Item key={cat}>{cat}</Dropdown.Item>
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
          <Dropdown.Item key={format}>{BookType[format]}</Dropdown.Item>
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

  useEffect(() => {
    wallet?.client.getActiveAccount().then((activeAccount) => {
      if (activeAccount) {
        setActiveAccount(activeAccount);
      }
    });
  }, [wallet]);

  return (
    <div className="create-book">
      <section className="flat-title-page inner">
        <h1 className="heading text-center">Mint Book</h1>
      </section>
      <div className="tf-create-book tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 className="title-create-book">Preview item</h4>
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
                    <h5> 4.89 xtz</h5>
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
              <div className="form-create-book">
                <FileUpload
                  title="Upload Cover Art"
                  description={
                    fileSelected?.name || '.pdf. .docx, or .txt. Max 200mb.'
                  }
                  onBlur={handleFileChange}
                />
                <div className="flat-tabs tab-create-book">
                  <h4 className="title-create-book">Select method</h4>
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
                            <h4 className="title-create-book">Price</h4>
                            <input
                              type="number"
                              style={{ backgroundColor: 'transparent' }}
                              placeholder="Enter price for one item (xtz)"
                              onBlur={() => setPrice}
                            />
                          </div>
                          <div className="col-4">
                            <h4 className="title-create-book">Royalties</h4>
                            <input
                              type="number"
                              placeholder="5%"
                              value={royalties}
                              onBlur={(e) => setRoyalty(Number(e.target.value))}
                            />
                          </div>

                          <div className="col-4">
                            <h4 className="title-create-book">Quantity</h4>
                            <input
                              type="number"
                              placeholder="e.g. “# of books to be minted”"
                              value={quantity}
                              onBlur={(e) =>
                                setQuantity(Number(e.target.value))
                              }
                            />
                          </div>
                        </div>

                        <h4 className="title-create-book">Title</h4>
                        <input
                          type="text"
                          placeholder="Item Name"
                          onBlur={(e) => {
                            setTitle(e.target.value);
                          }}
                        />

                        <h4 className="title-create-book">Description</h4>
                        <textarea
                          placeholder="e.g. “This is very limited item”"
                          onBlur={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <div
                          className="row-form style-3"
                          style={{
                            justifyContent: 'revert',
                            flexDirection: 'row-reverse',
                          }}
                        >
                          <div className="col-4" style={{ padding: 'revert' }}>
                            <h4 className="title-create-book">eBook Format</h4>
                            <BookFormatPicker />
                          </div>
                          <div
                            className="col-4"
                            style={{ padding: 'revert', marginRight: '2em' }}
                          >
                            <h4 className="title-create-book">Category</h4>
                            <CategoryDropdown />
                          </div>
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-book">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />
                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-book">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-book">
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

                        <h4 className="title-create-book">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-book">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <form action="#">
                        <h4 className="title-create-book">Price</h4>
                        <input
                          type="number"
                          placeholder="Enter price for one item (xtz)"
                        />

                        <h4 className="title-create-book">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />

                        <div className="row">
                          <div className="col-md-6">
                            <h5 className="title-create-book">Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date2"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h4 className="title-create-book">
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

                        <h4 className="title-create-book">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 className="title-create-book">Description</h4>
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
