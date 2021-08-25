import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  transactionLoader: state.transactionLoader,
});

const StakingForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [stakeValue, setStakeValue] = useState(0);
  const [unStakeValue, setUnStakeValue] = useState(0);

  const handleStakeMaxAmount = () => {
    setStakeValue(props?.MGTBalance);
  };

  const handleUnStakeMaxAmount = () => {
    setUnStakeValue(props.stakeBalance);
  };

  const handleStakeChange = (e) => {
    if (e.target.value) {
      setStakeValue(e.target.value);
    }
  };
  const handleUnStakeChange = (e) => {
    if (e.target.value) {
      setUnStakeValue(e.target.value);
    }
  };

  useEffect(() => {
    setStakeValue(0);
    setUnStakeValue(0);
  }, [showForm]);

  useEffect(() => {
    if (props.transactionLoader) {
      setStakeValue(0);
      setUnStakeValue(0);
    }
  }, [props.transactionLoader]);

  return (
    <>
      <div
        class="col-lg-12 p0 pull-left text-center"
        className={"col-lg-12 p0 pull-left clrWhite text-center"}
      >
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
          ${props.data.name}
        </div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
          ${props.data.apy}
        </div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
          ${props.data.total_pool}
        </div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
          {props.data.stakable}
        </div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
          ${props.data.value_stakable}
        </div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
          {props.data.earned}
        </div>
        <div class="col-lg-2 col-sm-2 m-t-25 pull-left">
          <a
            onClick={() => setShowForm(!showForm)}
            class="outline-btn success-out"
          >
            {showForm ? "Close" : "Manage"}
          </a>
        </div>
      </div>
      {/* className={showForm ? 'slider' : 'slider open'} */}
      <div class="boxSlide" className={!showForm ? "slider" : "slider open"}>
        <div
          className={
            !showForm
              ? "col-lg-12 pull-left boxborder"
              : "col-lg-12 pull-left boxborderslide"
          }
        >
          <div
            className={
              !showForm
                ? "col-lg-12 pull-left contentform"
                : "col-lg-12 pull-left contentformslide"
            }
          >
            <div
              className="position-absolute "
              style={{
                fontSize: "28px",
                right: "2rem",
                top: "1rem",
                zIndex: "9",
                cursor: "pointer",
              }}
              onClick={() => setShowForm(false)}
            >
              <i class="fa fa-times text-white"></i>
            </div>

            <div className="col-lg-12 pull-left text-center p-d-30">
              {"To stake, get DFL tokens by staking DFL Tokens into here."}
            </div>
            <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
              {/* <br/> */}
              <i className="smlTxt">
                Balance:{props?.MGTBalance} {props.data.poolId ? "LP" : "DFL"}
              </i>
              <div className="d-flex align-items-end">
                <input
                  type="number"
                  className="form-control text-dark font-weight-bold form-control-active"
                  placeholder="0.0"
                  value={Number(stakeValue)}
                  onChange={handleStakeChange}
                />
                <button
                  style={{
                    position: "absolute",
                    right: "15px",
                    padding: "5px",
                    alignSelf: "center",
                    color: "#000",
                    marginTop: "4px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={handleStakeMaxAmount}
                >
                  Max
                </button>
              </div>
              <div className="col-lg-12 m-auto">
                <button
                  type="button"
                  onClick={() =>
                    props.handleStakeForm(stakeValue, props.data.poolId)
                  }
                  className="btn col-lg-12 m-t-15 btn-button btn-circular"
                >
                  Stake
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
              <i className="smlTxt">
                Staked: {props.stakeBalance} {props.data.poolId ? "LP" : "DFL"}
              </i>
              <div className="d-flex">
                <input
                  type="number"
                  className="form-control  font-weight-bold form-control-active"
                  placeholder="0.0"
                  value={unStakeValue}
                  onChange={handleUnStakeChange}
                />

                <button
                  style={{
                    position: "absolute",
                    right: "15px",
                    cursor: "pointer",

                    padding: "5px",
                    alignSelf: "center",
                    marginTop: "4px",
                    color: "#000",
                    borderRadius: "5px",
                  }}
                  onClick={handleUnStakeMaxAmount}
                >
                  Max
                </button>
              </div>
              <div className="col-lg-11 m-auto">
                <button
                  type="button"
                  onClick={() =>
                    props.handleUnStakeForm(unStakeValue, props.data.poolId)
                  }
                  className="btn col-lg-12 m-t-15 btn-button btn-circular"
                >
                  Unstake
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

StakingForm.propTypes = {};

StakingForm.defaultProps = {};

export default connect(mapStateToProps)(StakingForm);
