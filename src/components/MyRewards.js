import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  balance1: state.balance1,
  balance2: state.balance2,
  balance3: state.balance3,
});

const MyRewards = ({ balance1, balance2, balance3 }) => {
  return (
    <div className="row m-b-30 blueTxt">
      <div className="col-lg-12 m-b-30">
        {" "}
        <small className="tag-line">
          {" "}
          <i>My Rewards</i>
        </small>{" "}
      </div>
      <div className="col-lg-3">
        MCT
        <br />
        <span className="smlTxt">Locked</span>
        <input
          type="text"
          disabled="disabled"
          className="form-control"
          value={balance1}
          placeholder=""
        />
        <br />
        <span className="smlTxt">Unlocked</span>
        <input type="text" className="form-control" placeholder="" />
      </div>
      <div className="col-lg-1 "></div>
      <div className="col-lg-3">
        MGT
        <br />
        <span className="smlTxt">Claimed</span>
        <input
          type="text"
          disabled="disabled"
          className="form-control"
          value={balance3}
          placeholder=""
        />
        <br />
        <span className="smlTxt">Unclaimed</span>
        <input
          type="text"
          disabled="disabled"
          className="form-control"
          placeholder=""
        />
      </div>
      <div className="col-lg-1"></div>
      <div className="col-lg-3">
        MYT
        <br />
        <span className="smlTxt">Available</span>
        <input
          type="text"
          className="form-control"
          disabled="disabled"
          value={balance2}
          placeholder=""
        />
      </div>
      <div className="col-lg-1 "></div>
      <div className="col-lg-12 p0 m-t-15">
        <div className="col-lg-3 m-auto">
          <button type="button" className="btn button btn-button btn-circular">
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
