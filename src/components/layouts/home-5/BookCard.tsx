import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Book } from './Book';
import './BookCard.scss';
interface BookProps {
  books: Book[];
  maxCards?: number;
  cardClassName?: string;
}

interface CardProps {
  book: Book;
  cardClassName?: string;
  key?: number;
}

export const BookCard = ({book, cardClassName, key}: CardProps) => (
  <div data-testid="bookCard" key={key} className={`fl-item ${cardClassName}`}>
  <div className={`sc-card-product comingsoon`}>
    <div className="card-title">
      <h4 data-testid="card-title" className="style2">
        {/* if not defined make the link disabled */}
        <Link to={`/book-details/${book.id}`}>{book.title}</Link>
      </h4>
      {/* <div className="tags">{item.tags}</div> */}
    </div>
    <div className="media">
      {/* card details */}
      <div className="metadata">
        <h6> author</h6>

        {/* if not defined make the link disabled */}
        <p className="cardTitle">
          <Link data-testid="card-authorId" to={`/authors/${book.AuthorId}`}>
            {book.nameAuthor}
          </Link>{' '}
        </p>
        <h6> price</h6>
        <p data-testid="card-price">{book.price} xtz</p>
        {/* <div className="avatar">
              <img src={book.imgAuthor} alt="axies" />
            </div> */}
      </div>
      {/* card image */}
      {/* if not defined make the link disabled */}
      <Link to={`/book-details/${book.id}`}>
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
      <p data-testid="card-description">{book.description}</p>
      <h6 className="more-details">
        {/* if not defined make the link disabled */}
        <Link to={`/book-details/${book.id}`}>more details</Link>
      </h6>
    </div>
  </div>
</div>
)

const BookCards = (props: BookProps) => {
  return (
    <Fragment>
      {props.books.slice(0, props.maxCards).map((book, index) => (
        <BookCard book={book} cardClassName={props.cardClassName} key={index} />
      ))}
    </Fragment>
  );
};

export default BookCards;
