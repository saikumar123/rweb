import React from "react";
import PropTypes from "prop-types";

const Deposit = () => (
  <div class="row m-b-30 blueTxt">
    <div class="col-lg-12 m-b-30">
      {" "}
      <small class="tag-line">
        {" "}
        <i>Deposits</i>
      </small>{" "}
    </div>
    <div class="col-lg-3">
      Enter Amount
      <br />
      <input type="text" class="form-control" placeholder="" />
    </div>
    <div class="col-lg-1 "></div>
    <div class="col-lg-3">
      <span class="smlTxt">Select Unit</span>
      <select class="custom-select">
        <option value="1">USDT</option>
        <option value="2">Ethereum</option>
        <option value="3">Repple</option>
      </select>
      <br />
      <br />

      <button type="button" class="btn button btn-button btn-circular">
        Deposit
      </button>
    </div>
    <div class="col-lg-1"></div>
    <div class="col-lg-3">
      Enter % share allocation
      <br />
      <input type="text" class="form-control" placeholder="" />
      <span class="smlTxt">This field cannot be left blank.</span>
    </div>
    <div class="col-lg-1 "></div>
  </div>
);

Deposit.propTypes = {};

Deposit.defaultProps = {};

export default Deposit;
