import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface BookProps {
  books: {
    feature: boolean;
    img: string;
    title: string;
    tags: string[];
    imgAuthor: string;
    nameAuthor: string;
    price: string;
    priceChange: string;
    wishlist: string[];
    imgCollection: string;
    nameCollection: string;
    id: string;
    AuthorId: string;
  }[];
  maxCards: number;
}

const BookCards = (props: BookProps) => {
  return (
    <Fragment>
      {props.books.slice(0, props.maxCards).map((book, index) => (
        <div
          key={index}
          className="fl-item col-xl-3 col-lg-3 col-md-4 col-sm-6"
        >
          <div
            className={`sc-card-product ${book.feature ? 'comingsoon' : ''} `}
          >
            <div className="card-media">
              <Link to={`/item-details/id=${book.id}`}>
                <img
                  src={book.img}
                  alt="axies"
                  style={{ width: '20em', borderRadius: '20px' }}
                />
              </Link>
              {/* <Link to="/login" className="wishlist-button heart">
              <span className="number-like">{item.wishlist}</span>
            </Link> */}
              {/* <div className="coming-soon">{item.feature}</div> */}
            </div>
            <div className="card-title">
              <h5 className="style2">
                <Link to={`/item-details/id=${book.id}`}>{book.title}</Link>
              </h5>
              {/* <div className="tags">{item.tags}</div> */}
            </div>
            <div className="meta-info">
              <div className="author">
                <div className="avatar">
                  <img src={book.imgAuthor} alt="axies" />
                </div>
                <div className="info">
                  <h6>
                    <Link to={`/authors/${book.AuthorId}`}>
                      {book.nameAuthor}
                    </Link>{' '}
                  </h6>
                </div>
              </div>
              <div className="price">
                <span>Book Price</span>
                <h5> {book.price}</h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default BookCards;