import React from "react";
import PropTypes from "prop-types";

const MyRewards = () => (
  <div class="row m-b-30 blueTxt">
    <div class="col-lg-12 m-b-30">
      {" "}
      <small class="tag-line">
        {" "}
        <i>My Rewards</i>
      </small>{" "}
    </div>
    <div class="col-lg-3">
      MCT
      <br />
      <span class="smlTxt">Locked</span>
      <input type="text" class="form-control" placeholder="" />
      <br />
      <span class="smlTxt">Unlocked</span>
      <input type="text" class="form-control" placeholder="" />
    </div>
    <div class="col-lg-1 "></div>
    <div class="col-lg-3">
      MGT
      <br />
      <span class="smlTxt">Claimed</span>
      <input type="text" class="form-control" placeholder="" />
      <br />
      <span class="smlTxt">Unclaimed</span>
      <input type="text" class="form-control" placeholder="" />
      <br />
      <button type="button" class="btn button btn-button btn-circular">
        Redeem
      </button>
    </div>
    <div class="col-lg-1"></div>
    <div class="col-lg-3">
      MYT
      <br />
      <span class="smlTxt">Available</span>
      <input type="text" class="form-control" placeholder="" />
    </div>
    <div class="col-lg-1 "></div>
  </div>
);

MyRewards.propTypes = {};

MyRewards.defaultProps = {};

export default MyRewards;
