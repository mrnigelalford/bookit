import React from 'react';
import { Link } from 'react-router-dom';

const ModalComponent = () => {
  return (
    <div
      className="modal fade popup"
      id="popup_bid"
      data-tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-body space-y-20 pd-40">
            <h3>Place a Bid</h3>
            <p className="text-center">
              You must bid at least{' '}
              <span className="price color-popup">4.89 xtz</span>
            </p>
            <input
              type="text"
              className="form-control"
              placeholder="00.00 xtz"
            />
            <p>
              Enter quantity. <span className="color-popup">5 available</span>
            </p>
            <input type="number" className="form-control" placeholder="1" />
            <div className="hr"></div>
            <div className="d-flex justify-content-between">
              <p> You must bid at least:</p>
              <p className="text-right price color-popup"> 4.89 xtz </p>
            </div>
            <div className="d-flex justify-content-between">
              <p> Service free:</p>
              <p className="text-right price color-popup"> 0,89 xtz </p>
            </div>
            <div className="d-flex justify-content-between">
              <p> Total bid amount:</p>
              <p className="text-right price color-popup"> 4 xtz </p>
            </div>
            <Link
              to="#"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#popup_bid_success"
              data-dismiss="modal"
              aria-label="Close"
            >
              {' '}
              Place a bid
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
