import React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumbs.scss'

export const Breadcrumbs = (props) => (
  <div className="breadcrumbs style2">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="#">Explore</Link>
      </li>
      <li>Item Details</li>
    </ul>
    <h1 className="heading text-center">{props.header}</h1>
  </div>
);
