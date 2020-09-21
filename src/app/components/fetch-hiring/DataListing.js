import React from 'react';
import './DataListing.css';

const DataListing = ({ listing }) => {
  return (
    <li className="c-list__item">
      <span>name: {listing.name}</span>
      <span> - </span>
      <span>listId: {listing.listId}</span>
    </li>
  );
};

export default DataListing;