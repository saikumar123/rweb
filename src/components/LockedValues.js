import React from "react";
import PropTypes from "prop-types";

const LockedValues = () => (
  <div className="content-body-padding">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 m-b-30">
          <div className="alert alert-info">Protocol Locked Values</div>
        </div>
      </div>
    </div>

    <div className="tables-section">
      <div className="container-fluid">
        <div className="row m-b-30 blueTxt">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 "></div>
          <div className="col-lg-1 tright">Total</div>
          <div className="col-lg-3">
            <input type="text" className="form-control" placeholder="" />
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-3 "></div>
        </div>
        <div className="row m-b-30 blueTxt">
          <div className="col-lg-1 tright">DAI</div>
          <div className="col-lg-3 ">
            <input type="text" className="form-control" placeholder="" />
          </div>
          <div className="col-lg-1 tright">USDT</div>
          <div className="col-lg-3 ">
            <input type="text" className="form-control" placeholder="" />
          </div>

          <div className="col-lg-1 tright">USDC</div>
          <div className="col-lg-3 ">
            <input type="text" className="form-control" placeholder="" />
          </div>
        </div>

        <div className="row m-b-30 blueTxt">
          <div className="col-lg-1"></div>
          <div className="col-lg-3 "></div>
          <div className="col-lg-1 tright">Gov</div>
          <div className="col-lg-3">
            <input type="text" className="form-control" placeholder="" />
          </div>
          <div className="col-lg-1 "></div>
          <div className="col-lg-3 "></div>
        </div>
      </div>
    </div>
  </div>
);

LockedValues.propTypes = {};

LockedValues.defaultProps = {};

export default LockedValues;
