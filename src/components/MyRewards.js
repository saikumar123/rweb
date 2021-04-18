import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  balance1: state.balance1,
  balance2: state.balance2,
  balance3: state.balance3,
});

const MyRewards = ({ balance1, balance2, balance3 }) => {
  return (
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
        <input
          type="text"
          disabled="disabled"
          class="form-control"
          value={balance1}
          placeholder=""
        />
        <br />
        <span class="smlTxt">Unlocked</span>
        <input type="text" class="form-control" placeholder="" />
      </div>
      <div class="col-lg-1 "></div>
      <div class="col-lg-3">
        MGT
        <br />
        <span class="smlTxt">Claimed</span>
        <input
          type="text"
          disabled="disabled"
          class="form-control"
          value={balance3}
          placeholder=""
        />
        <br />
        <span class="smlTxt">Unclaimed</span>
        <input
          type="text"
          disabled="disabled"
          class="form-control"
          placeholder=""
        />
      </div>
      <div class="col-lg-1"></div>
      <div class="col-lg-3">
        MYT
        <br />
        <span class="smlTxt">Available</span>
        <input
          type="text"
          class="form-control"
          disabled="disabled"
          value={balance2}
          placeholder=""
        />
      </div>
      <div class="col-lg-1 "></div>
      <div class="col-lg-12 p0 m-t-15">
        <div class="col-lg-3 m-auto">
          <button type="button" class="btn button btn-button btn-circular">
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
};

MyRewards.propTypes = {};

MyRewards.defaultProps = {};

export default connect(mapStateToProps)(MyRewards);
