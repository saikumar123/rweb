import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { connect } from "react-redux";
import ethAddressConfig from "../abis/ethAddressConfig";

import { stakeGovABI } from "../abis/Stake_Gov_ABI";
import { toast } from "react-toastify";
import { stakeABI } from "../abis/Stake";

const mapStateToProps = (state, props) => ({
  MCTBalance: state.MCTBalance,
  MGTBalance: state.MGTBalance,
  MYTBalance: state.MYTBalance,
  getAllBalance: props?.getAllBalance,
});

const MyRewards = ({
  MCTBalance,
  MGTBalance,
  MYTBalance,
  account,
  getAllBalance,
}) => {
  const web3 = window?.web3;
  const [MGTRedeemLoading, setMGTRedeemLoading] = useState(false);
  const [MYTRedeemLoading, setMYTRedeemLoading] = useState(false);

  const redeemMGTTokensHandler = async () => {
    const web3 = window.web3;
    setMGTRedeemLoading(true);
    if (web3 !== undefined && web3.eth !== undefined) {
      const stakeGovABIObject = new web3.eth.Contract(
        stakeGovABI,
        ethAddressConfig.gov_address
      );

      await stakeGovABIObject.methods
        .claimRewards(account)
        .send({ from: account })
        .then((receipt) => {
          console.log(receipt);
          if (receipt.status) {
            toast.success("Transaction Success");
            setMGTRedeemLoading(false);
            getAllBalance();
          } else {
            setMGTRedeemLoading(false);
            toast.error("Transaction Failed");
          }
        });
    } else {
      console.log("web3 is not defined");
      setMGTRedeemLoading(false);
    }
  };

  const redeemMYTTokensHandler = async () => {
    const web3 = window.web3;
    setMYTRedeemLoading(true);
    if (web3 !== undefined && web3.eth !== undefined) {
      const stakeABIObject = new web3.eth.Contract(
        stakeABI,
        ethAddressConfig.stake_address
      );

      await stakeABIObject.methods
        .claimRewards(account)
        .send({ from: account })
        .then((receipt) => {
          if (receipt.status) {
            toast.success("Transaction Success");
            setMYTRedeemLoading(false);
            getAllBalance();
          } else {
            setMYTRedeemLoading(false);
            toast.error("Transaction Failed");
          }
        });
    } else {
      setMYTRedeemLoading(false);
    }
  };

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
              MCTBalance?.lockedMCT &&
              web3.utils.fromWei(MCTBalance?.lockedMCT, "Ether")
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
              MCTBalance?.unlockedMCT &&
              web3.utils.fromWei(MCTBalance?.unlockedMCT, "Ether")
            }
          />
        </div>
        <div className="col-lg-11 col-sm-12 m-auto text-center">
          <Button
            type="button"
            className="btn button btn-button btn-circular col-sm-11 mt-3 "
            disabled
          >
            Redeem
          </Button>
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
            value={MGTBalance?.claimedMGTBalance}
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
            value={MGTBalance?.unClaimedMGTBalance}
          />
        </div>
        <div className="col-lg-11 col-sm-12 m-auto text-center">
          <Button
            type="button"
            className="btn button btn-button btn-circular col-sm-11 mt-3 "
            disabled={Number(MGTBalance?.unClaimedMGTBalance) === 0}
            onClick={redeemMGTTokensHandler}
            loading={MGTRedeemLoading}
          >
            Redeem
          </Button>
        </div>
      </div>
      <div className="col-lg-1 col-sm-1"></div>
      <div className="col-lg-3 col-sm-3 col-xs-12">
        <div style={{ fontSize: "16px", fontWeight: "bold" }}> MYT</div>
        <div className="col-lg-12 p0 m-b-10 mt-3">
          <i className="smlTxt">Claimed</i>
          <input
            type="text"
            className="form-control"
            disabled="disabled"
            value={MYTBalance?.claimedMYTBalance}
            placeholder=""
          />
        </div>
        <div className="col-lg-12 p0 m-b-10">
          <i className="smlTxt">Unclaimed</i>
          <input
            type="text"
            disabled="disabled"
            className="form-control"
            value={MYTBalance?.unClaimedMYTBalance}
            placeholder=""
          />
        </div>
        <div className="col-lg-11 col-sm-12 m-auto text-center">
          <Button
            type="button"
            className="btn button btn-button btn-circular col-sm-11 mt-3 "
            disabled={Number(MYTBalance?.unClaimedMYTBalance) === 0}
            onClick={redeemMYTTokensHandler}
            loading={MYTRedeemLoading}
          >
            Redeem
          </Button>
        </div>
      </div>
      <div className="col-lg-1 "></div>
    </div>
  );
};

MyRewards.propTypes = {};

MyRewards.defaultProps = {};

export default connect(mapStateToProps)(MyRewards);
