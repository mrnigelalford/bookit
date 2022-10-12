import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Dropdown } from 'react-bootstrap';
import { pinFileToIPFS } from '../../global/pinata';
import { mintToken } from '../../global/smartContract';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import BookCards from '../../components/layouts/home-5/BookCard';

import './CreateBook.scss';

import img3 from '../../assets/images/box-item/green-ottez.png';
import { Contracts } from '../../App';

enum BookType {
  epub = 'epub',
  mobi = 'mobi',
}

interface UploadProps {
  title: string;
  description: string;
  onBlur: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

interface CreateItemProps {
  wallet?: BeaconWallet;
  Tezos?: TezosToolkit;
  toast: any;
}

const CreateItem = ({ wallet, Tezos, toast }: CreateItemProps) => {
  const [frontCover, setFrontCover] = useState<File>(); // also tried <string | Blob>
  const [backCover, setBackCover] = useState<File>(); // also tried <string | Blob>
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
  const [activeAccount, setActiveAccount] = useState<any>();

  let navigate = useNavigate();

  const previewBookCard = [
    {
      title,
      img: frontCover ? URL.createObjectURL(frontCover) : img3,
      nameAuthor: activeAccount?.address,
      price,
      AuthorId: activeAccount?.address,
      description,
    },
  ];

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

  const handleFrontCoverChange = function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const fileList = e.target.files;
    if (!fileList) return;
    setFrontCover(fileList[0]);
  };

  const handleBackCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setBackCover(fileList[0]);
  };

  const handleBookUpload = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    setBookUpload(fileList[0]);
  };

  const mintForm = async () => {
    const bookCover = new FormData();
    if (frontCover) {
      bookCover.append('file', frontCover);
      const _title = title?.replace(/ /g, '');
      bookCover.append('title',  _title + '_' + Date.now());
    }

    const bookFile = new FormData();
    if (bookUpload) {
      bookFile.append('file', bookUpload);
      const _title = title?.replace(/ /g, '');
      bookFile.append('title',  _title + '_' + Date.now());
    }

    // send form to IPFS
    if (bookCover.has('file') && bookFile.has('file')) {
      const { data: coverIPFS } = await pinFileToIPFS(bookCover);
      const { data: bookIPFS } = await pinFileToIPFS(bookFile);

      if ((coverIPFS.PinSize > 0) && (bookIPFS.PinSize > 0)) {
        const nftInfo = {
          coverIpfsHash: coverIPFS.IpfsHash,
          bookIpfsHash: bookIPFS.IpfsHash,
          price,
          title,
          description,
          category,
          bookType,
          royalties,
          quantity,
          authorName: activeAccount.address,
        };

        if (Tezos && activeAccount) {
          toast.info("Starting mint....page will go home upon completion", {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            autoClose: 8000,
          });
          await mintToken({Tezos, nftInfo, owner: activeAccount?.address});
          toast.success("Confirmations have completed, congrats!", {
            position: toast.POSITION.TOP_CENTER,
            pauseOnHover: true,

          })
          navigate(`/`, { replace: true });
        }
      }
    }
  };

  const FileUpload: React.FC<UploadProps> = (props: UploadProps) => (
    <form style={{ marginTop: '1em' }} action="#" className="col-6">
      <h4 className="title-create-book">{props.title}</h4>
      <label className="uploadFile">
        <p
          className="filename"
        >
          {props.description}
        </p>
        <input
          type="file"
          className="inputfile form-control"
          name="fileUpload"
          onChange={props.onBlur}
        />
      </label>
    </form>
  );

  const CategoryDropdown: React.FC = () => (
    <div className="col-4 last">
      <h4 className="title-create-book">Category</h4>
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
    </div>
  );

  const BookFormatPicker: React.FC = () => (
    <div className="col-4">
      <h4 className="title-create-book">eBook Format</h4>
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
    </div>
  );

  // const uploadFile = function (
  //   e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  // ) {
  //   if (frontCover) {
  //     const formData = new FormData();
  //     formData.append('image', frontCover, frontCover.name);
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
    <div className="create-book pageBody">
      <section className="flat-title-page inner">
        <h1 className="heading text-center">Mint Book</h1>
      </section>
        <div className="row mintForm">
          {/* Mint Form */}
          <div className="col-lg-6 col-sm-12 form-create-book">
            <div className="row">
              <FileUpload
                title="Upload front cover"
                description={frontCover?.name || '.jpg or .png. Max 300mb.'}
                onBlur={handleFrontCoverChange}
              />
              <FileUpload
                title="Upload book"
                description={bookUpload?.name || '.epub or .pdf. Max 300mb.'}
                onBlur={handleBookUpload}
              />
            </div>
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
                          onChange={(e) => setQuantity(Number(e.target.value))}
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

                    <div className="row-form style-3">
                      <BookFormatPicker />
                      <CategoryDropdown />
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
                        <h4 className="title-create-book">Expiration date</h4>
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
                        <h4 className="title-create-book">Expiration date</h4>
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
          {/* /Mint Form */}

          {/* Preview Card */}
          <div className="col-lg-6 col-sm-12 previewCard">
            <h4 className="title-create-book">Preview book</h4>

            <BookCards books={previewBookCard} cardClassName="col-6 bookCard" />
            <button
              className="sc-button style bag fl-button pri-3 col-6"
              onClick={() => mintForm()}
            >
              Mint Book
            </button>
          </div>
          {/* /Preview Card */}
        </div>
    </div>
  );
};

export default CreateItem;
