import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './BookCard.scss';

interface BookProps {
  books: {
    img?: string;
    title?: string | null;
    tags?: string[];
    imgAuthor?: string;
    nameAuthor: string;
    price: string | number;
    // wishlist?: string[];
    // imgCollection: string;
    // nameCollection: string;
    id?: string;
    AuthorId: string; // TODO: REVISIT HOW THIS IS DEFINED FOR A GIVEN USER
    description: string | null;
  }[];
  maxCards?: number;
  cardClassName?: string;
}

const longText =
  "I'm baby salvia fingerstache thundercats pug. Sartorial next level asymmetrical man braid. Yuccie enamel pin lumbersexual unicorn ennui, taxidermy sustainable venmo put a bird on it helvetica tbh";
const tempStyle = 'col-xl-3 col-lg-4 col-md-4 col-sm-6';

const BookCards = (props: BookProps) => {
  return (
    <Fragment>
      {props.books.slice(0, props.maxCards).map((book, index) => (
        <div key={index} className={`fl-item ${props.cardClassName}`}>
          <div className={`sc-card-product comingsoon`}>
            <div className="card-title">
              <h4 className="style2">
                {/* if not defined make the link disabled */}
                <Link to={`/item-details/${book.id}`}>{book.title}</Link>
              </h4>
              {/* <div className="tags">{item.tags}</div> */}
            </div>
            <div className="media">
              {/* card details */}
              <div className="metadata">
                <h6> author</h6>

                {/* if not defined make the link disabled */}
                <p style={{ fontWeight: 600 }}>
                  <Link to={`/authors/${book.AuthorId}`}>
                    {book.nameAuthor + longText}
                  </Link>{' '}
                </p>
                <h6> price</h6>
                <p>{book.price} xtz</p>
                {/* <div className="avatar">
                      <img src={book.imgAuthor} alt="axies" />
                    </div> */}
              </div>
              {/* card image */}
              {/* if not defined make the link disabled */}
              <Link to={`/item-details/${book.id}`}>
                <img
                  src={book.img}
                  alt="axies"
                  style={{ width: '20em', borderRadius: '20px' }}
                />
              </Link>
              {/* <Link to="/login" className="wishlist-button heart">
              <span className="number-like">{item.wishlist}</span>
            </Link> */}
            </div>
            <div className="description">
              <h6>Description</h6>
              <p>{book.description}</p>
              <h6 className="more-details">
                {/* if not defined make the link disabled */}
                <Link to={`/item-details/${book.id}`}>more details</Link>
              </h6>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default BookCards;
