import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../layouts/home-5/Book';
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

export const truncateString = (string = '', maxLength = 50) => 
  string.length > maxLength 
    ? `${string.substring(0, maxLength)}…`
    : string


export const BookCard = ({ book, cardClassName, key }: CardProps) => {
  book.nameAuthor = truncateString(book.nameAuthor, 10)
return (
  <div data-testid="bookCard" key={key} className={`fl-item ${cardClassName}`}>
    <div className={`sc-card-product comingsoon`}>
      <div className="card-title">
        <h4 data-testid="card-title" className="style2">
          <div>
            {book.isPreviewCard
              ? <span>{book.title}</span>
              : <Link to={`/book-details/${book.id}`}>{book.title}</Link>
            }
          </div>
          {book?.id && <Link to={`/book-details/${book.id}`}>{book.title}</Link>}
        </h4>
        {/* <div className="tags">{item.tags}</div> */}
      </div>
      <div className="media">
        {/* card details */}
        <div className="metadata">
          <h6> author</h6>
          <p className="cardAuthor">
            <div>
              {book.isPreviewCard
                ? <span>{book.nameAuthor}</span>
                : <Link data-testid="card-authorId" to={`/authors/${book.AuthorId}`}>
                  {book.nameAuthor}
                </Link>
              }
            </div>
          </p>
          <h6> price</h6>
          <p data-testid="card-price">{book.price} xtz</p>
          {/* <div className="avatar">
              <img src={book.imgAuthor} alt="axies" />
            </div> */}
        </div>
        {/* card image */}
        <div>
          {book.isPreviewCard
            ? <img
              src={book.img}
              alt="axies"
              style={{ width: '20em', borderRadius: '20px' }}
            />
            : <Link to={`/book-details/${book.id}`}>
              <img
                src={book.img}
                alt="axies"
                style={{ width: '20em', borderRadius: '20px' }}
              />
            </Link>
          }
        </div>

        {/* <Link to="/login" className="wishlist-button heart">
      <span className="number-like">{item.wishlist}</span>
    </Link> */}
      </div>
      <div className="description">
        <h6>Description</h6>
        <p data-testid="card-description">{book.description}</p>
        <h6 className="more-details">
          <div>
            {book.isPreviewCard
              ? <span>more details</span>
              : <Link to={`/book-details/${book.id}`}>more details</Link>
            }
          </div>
        </h6>
      </div>
    </div>
  </div>
)}

const BookCards = (props: BookProps) => {
  return (
    <Fragment>
      {props.books.slice(0, props.maxCards).filter(b => b && b?.AuthorId?.length).map((book, index) => (
        <BookCard book={book} cardClassName={props.cardClassName} key={index} />
      ))}
    </Fragment>
  );
};

export default BookCards;
