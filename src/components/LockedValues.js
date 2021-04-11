import React from "react";
import PropTypes from "prop-types";

const LockedValues = () => (
  <div class="content-body">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 m-b-30">
          <div class="alert alert-info">Protocol Locked Values</div>
        </div>
      </div>
    </div>

    <div class="tables-section">
      <div class="container-fluid">
        <div class="row m-b-30 blueTxt">
          <div class="col-lg-1"></div>
          <div class="col-lg-3 "></div>
          <div class="col-lg-1 tright">Total</div>
          <div class="col-lg-3">
            <input type="text" class="form-control" placeholder="" />
          </div>
          <div class="col-lg-1"></div>
          <div class="col-lg-3 "></div>
        </div>
        <div class="row m-b-30 blueTxt">
          <div class="col-lg-1 tright">DAI</div>
          <div class="col-lg-3 ">
            <input type="text" class="form-control" placeholder="" />
          </div>
          <div class="col-lg-1 tright">USDT</div>
          <div class="col-lg-3 ">
            <input type="text" class="form-control" placeholder="" />
          </div>

          <div class="col-lg-1 tright">USDC</div>
          <div class="col-lg-3 ">
            <input type="text" class="form-control" placeholder="" />
          </div>
        </div>

        <div class="row m-b-30 blueTxt">
          <div class="col-lg-1"></div>
          <div class="col-lg-3 "></div>
          <div class="col-lg-1 tright">Governanace</div>
          <div class="col-lg-3">
            <input type="text" class="form-control" placeholder="" />
          </div>
          <div class="col-lg-1 "></div>
          <div class="col-lg-3 "></div>
        </div>
      </div>
    </div>
  </div>
);

LockedValues.propTypes = {};

LockedValues.defaultProps = {};

export default LockedValues;
