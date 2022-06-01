import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumbs = () => (
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
  </div>
);
