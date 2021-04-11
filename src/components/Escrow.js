import React from "react";
import PropTypes from "prop-types";

const Escrow = () => (
  <div class="row m-b-30 blueTxt">
    <div class="col-lg-12 m-b-30">
      {" "}
      <small class="tag-line">
        {" "}
        <i>Escrow</i>
      </small>{" "}
    </div>
    <div class="col-lg-3">
      MCT
      <br />
      <input type="text" class="form-control" placeholder="" />
    </div>
    <div class="col-lg-1 "></div>
    <div class="col-lg-3">
      Unlocked By
      <br />
      <input type="text" class="form-control" placeholder="" />
      <span class="smlTxt">This field cannot be left blank.</span>
      <br /> <br />
      <button type="button" class="btn button btn-button btn-circular">
        Deposit
      </button>
    </div>
    <div class="col-lg-1"></div>
    <div class="col-lg-3">
      Credited To
      <br />
      <input type="text" class="form-control" placeholder="" />
      <span class="smlTxt">
        If left blank the unlocking avatar will choose the credited to
      </span>
      <br />
    </div>
    <div class="col-lg-1 "></div>
  </div>
);

Escrow.propTypes = {};

Escrow.defaultProps = {};

export default Escrow;
