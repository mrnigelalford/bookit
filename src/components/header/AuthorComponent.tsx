
import React, { useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';


// get address from wallet login
// do db lookup
// create user if no address match found

interface AuthorProps {
  address: string;
}

const SetAuthorMutation = async (address: string) => {
  const SET_AUTHOR_BY_ADDRESS = gql`
    mutation SetAuthorByAddress($address: String!) {
      setAuthorByAddress(address: $address) {
        acknowledged
        insertedId
      }
    }
  `
  const [SetAuthor, { data }] = useMutation(SET_AUTHOR_BY_ADDRESS);

  return SetAuthor({ variables: { address } })
}

const AuthorComponent = ({ address }: AuthorProps) => {

  const GET_AUTHOR = gql`
    query Author($address: String) {
      author(address: $address) {
        address
        bioLink
        name
        img
      }
    }
  `;

  const { data } = useQuery(GET_AUTHOR, {
    variables: { address: address },
  });

  if (data && !data.author) {
    // console.log('set new author');
    // SetAuthorMutation(address)
  }

  if (data) {
    return (
      <div className="d-flex align-items-center copy-text justify-content-between">
        <Link to="/" className="ml-2">
          <h5>{data?.author?.name}</h5>
        </Link>
      </div>
    )
  }

  return (
    <></>
  )
}

export default AuthorComponent;
