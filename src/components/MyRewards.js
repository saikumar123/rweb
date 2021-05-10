import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  balance1: state.balance1,
  balance2: state.balance2,
  balance3: state.balance3,
});

const MyRewards = ({ balance1, balance2, balance3 }) => {
  return (
    <div className="row blueTxt">
      <div className="col-lg-12 m-b-15">
        {" "}
        <small className="tag-line">
          {" "}
          <i>My Rewards</i>
        </small>{" "}
      </div>
      <div className="col-lg-3 col-sm-3 col-xs-12">
        MCT
        <div className="col-lg-12 p0 m-b-10">
          <i className="smlTxt">Locked</i>
          <input
            type="text"
            disabled="disabled"
            className="form-control"
            value={balance1}
            placeholder=""
          />
        </div>
        <div className="col-lg-12 p0 m-b-10">
          <i className="smlTxt">Unlocked</i>
          <input type="text" className="form-control" disabled="disabled" placeholder="" />
        </div>
        <div className="col-lg-11 col-sm-12 m-auto">
          <button type="button" className="btn button btn-button btn-circular col-sm-11">
            Redeem
          </button>
        </div>
      </div>
      <div className="col-lg-1 col-sm-1"></div>
      <div className="col-lg-3 col-sm-3 col-xs-12">
        MGT
        <div className="col-lg-12 p0 m-b-10">
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
        <div className="col-lg-11 col-sm-12 m-auto">
          <button type="button" className="btn button btn-button btn-circular col-sm-11">
            Redeem
          </button>
        </div>
        
      </div>
      <div className="col-lg-1 col-sm-1"></div>
      <div className="col-lg-3 col-sm-3 col-xs-12">
        MYT
        <div className="col-lg-12 p0 m-b-10">
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
        <div className="col-lg-11 col-sm-12 m-auto">
          <button type="button" className="btn button btn-button btn-circular col-sm-11">
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
