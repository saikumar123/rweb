import React from "react";
import PropTypes from "prop-types";

const LockedValues = () => (
  <div className="content-body-padding">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 m-b-30">
          <div className="alert alert-info"><i>Protocol Locked Values</i></div>
        </div>
      </div>
    </div>
    <div className="tables-section">
      <div className="container-fluid">
        <div className="row m-b-30 blueTxt">
          <div className="col-lg-1 ">Total</div>
          <div className="col-lg-3">
            <input type="text" className="form-control" placeholder="" />
          </div>
        </div>
        
        <div className="row m-b-30 blueTxt">
          <div className="col-lg-1 ">DAI</div>
          <div className="col-lg-3 ">
            <input type="text" className="form-control" placeholder="" />
          </div>
        </div>
        <div className="row m-b-30 blueTxt">
          <div className="col-lg-1 ">USDT</div>
          <div className="col-lg-3 ">
            <input type="text" className="form-control" placeholder="" />
          </div>
        </div>
        <div className="row m-b-30 blueTxt">
          <div className="col-lg-1 ">USDC</div>
          <div className="col-lg-3 ">
            <input type="text" className="form-control" placeholder="" />
          </div>
        </div>

        <div className="row m-b-30 blueTxt"> 
          <div className="col-lg-1 ">Gov</div>
          <div className="col-lg-3">
            <input type="text" className="form-control" placeholder="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

LockedValues.propTypes = {};

LockedValues.defaultProps = {};

export default LockedValues;
