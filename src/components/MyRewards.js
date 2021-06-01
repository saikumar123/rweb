import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  balance1: state.balance1,
  balance2: state.balance2,
  balance3: state.balance3,
});

const MyRewards = ({ balance1, balance2, balance3 }) => {
  const web3 = window?.web3;
  return (
    <div className="row blueTxt text-white">
      <div className="col-lg-12 mb-4 ">
        <small
          className="tag-line font-weight-bold"
          style={{ fontSize: "20px" }}
        >
          My Rewards
        </small>
      </div>
      <div className="col-lg-3 col-sm-3 col-xs-12">
        <div style={{ fontSize: "16px", fontWeight: "bold" }}> MCT</div>
        <div className="col-lg-12 p0 m-b-10 mt-3">
          <i className="smlTxt">Locked</i>
          <input
            type="text"
            disabled="disabled"
            className="form-control"
            value={
              balance1?.lockedMCT &&
              web3.utils.fromWei(balance1?.lockedMCT, "Ether")
            }
            placeholder=""
          />
        </div>
        <div className="col-lg-12 p0 m-b-10 ">
          <i className="smlTxt">Unlocked</i>
          <input
            type="text"
            className="form-control "
            disabled="disabled"
            placeholder=""
            value={
              balance1?.unlockedMCT &&
              web3.utils.fromWei(balance1?.unlockedMCT, "Ether")
            }
          />
        </div>
        <div className="col-lg-11 col-sm-12 m-auto text-center">
          <button
            type="button"
            className="btn button btn-button btn-circular col-sm-11 mt-3 "
          >
            Redeem
          </button>
        </div>
      </div>
      <div className="col-lg-1 col-sm-1"></div>
      <div className="col-lg-3 col-sm-3 col-xs-12">
        <div style={{ fontSize: "16px", fontWeight: "bold" }}> MGT</div>
        <div className="col-lg-12 p0 m-b-10 mt-3">
          <i className="smlTxt">Claimed</i>
          <input
            type="text"
            disabled="disabled"
            className="form-control"
            value={balance3}
            placeholder=""
          />
        </div>
        <div className="col-lg-12 p0 m-b-10">
          <i className="smlTxt">Unclaimed</i>
          <input
            type="text"
            disabled="disabled"
            className="form-control"
            placeholder=""
          />
        </div>
        <div className="col-lg-11 col-sm-12 m-auto text-center">
          <button
            type="button"
            className="btn button btn-button btn-circular col-sm-11 mt-3 "
          >
            Redeem
          </button>
        </div>
      </div>
      <div className="col-lg-1 col-sm-1"></div>
      <div className="col-lg-3 col-sm-3 col-xs-12">
        <div style={{ fontSize: "16px", fontWeight: "bold" }}> MYT</div>
        <div className="col-lg-12 p0 m-b-10 mt-3">
          <i className="smlTxt">Available</i>
          <input
            type="text"
            className="form-control"
            disabled="disabled"
            value={balance2}
            placeholder=""
          />
        </div>
        <div className="col-lg-12 p0 m-b-10">
          <i className="smlTxt">Unavailable</i>
          <input
            type="text"
            disabled="disabled"
            className="form-control"
            placeholder=""
          />
        </div>
        <div className="col-lg-11 col-sm-12 m-auto text-center">
          <button
            type="button"
            className="btn button btn-button btn-circular col-sm-11 mt-3 "
          >
            Redeem
          </button>
        </div>
      </div>
      <div className="col-lg-1 "></div>
    </div>
  );
};

MyRewards.propTypes = {};

MyRewards.defaultProps = {};

export default connect(mapStateToProps)(MyRewards);
