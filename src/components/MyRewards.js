import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { connect } from "react-redux";
import { Confirm } from "semantic-ui-react";
import ethAddressConfig from "../abis/ethAddressConfig";

import { stakeGovABI } from "../abis/Stake_Gov_ABI";
import { toast } from "react-toastify";
import { stakeABI } from "../abis/Stake";
import { depositABI } from "../abis/deposit";
import { escrowABI } from "../abis/escrow_ABI";

const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  MGTBalance: state.MGTBalance,
  MYTBalance: state.MYTBalance,
});

const MyRewards = ({
  MCTBalance,
  MGTBalance,
  MYTBalance,
  account,
  totalPoolBalance,
  user,
  getAllBalance,
}) => {
  const web3 = window?.web3;
  const [MGTRedeemLoading, setMGTRedeemLoading] = useState(false);
  const [MYTRedeemLoading, setMYTRedeemLoading] = useState(false);
  const [exitPoolLoading, SetexitPoolLoading] = useState(false);

  const [exitPoolModal, showExitPoolModal] = useState(false);

  const redeemMGTTokensHandler = async () => {
    const web3 = window.web3;
    setMGTRedeemLoading(true);
    if (web3 !== undefined && web3.eth !== undefined) {
      const stakeGovABIObject = new web3.eth.Contract(
        stakeGovABI,
        ethAddressConfig.gov_address
      );
      const escrowABIObject = new web3.eth.Contract(
        escrowABI,
        ethAddressConfig.escrow_Address
      );

      await stakeGovABIObject.methods
        .claimRewards(account)
        .send({ from: account })
        .then(async (receipt) => {
          if (receipt.status) {
            await getAllBalance();
          } else {
            setMGTRedeemLoading(false);
            toast.error("Transaction Failed");
          }
        });

      await escrowABIObject.methods
        .claimRewards(account)
        .send({ from: account })
        .then(async (receipt) => {
          if (receipt.status) {
            toast.success("Transaction Success");
            setMGTRedeemLoading(false);
            await getAllBalance();
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
        .then(async (receipt) => {
          if (receipt.status) {
            toast.success("Transaction Success");
            setMYTRedeemLoading(false);
            await getAllBalance();
          } else {
            setMYTRedeemLoading(false);
            toast.error("Transaction Failed");
          }
        });
    } else {
      setMYTRedeemLoading(false);
    }
  };

  const exitPoolHandler = async () => {
    const web3 = window.web3;
    SetexitPoolLoading(true);
    if (web3 !== undefined && web3.eth !== undefined) {
      const depositABIObject = new web3.eth.Contract(
        depositABI,
        ethAddressConfig.deposit_Address
      );

      await depositABIObject.methods
        .exitPool()
        .send({ from: account })
        .then((receipt) => {
          if (receipt.status) {
            toast.success("Pool Exit Successfully");
            SetexitPoolLoading(false);
            getAllBalance();
          } else {
            SetexitPoolLoading(false);
            toast.error("Transaction Failed");
          }
        });
    } else {
      console.log("web3 is not defined");
      SetexitPoolLoading(false);
    }
  };

  const handleConfirm = () => {
    showExitPoolModal(false);
    exitPoolHandler();
  };
  const handleCancel = () => {
    showExitPoolModal(false);
  };

  return (
    <>
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
          <div style={{ fontSize: "16px", fontWeight: "bold" }}> FUSD</div>
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
              disabled={Number(totalPoolBalance) === 0 || exitPoolLoading}
              onClick={() => showExitPoolModal(true)}
              loading={exitPoolLoading}
            >
              Exit Pool
            </Button>
          </div>
        </div>
        <div className="col-lg-1 col-sm-1"></div>
        <div className="col-lg-3 col-sm-3 col-xs-12">
          <div style={{ fontSize: "16px", fontWeight: "bold" }}> DFL</div>
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
          <div style={{ fontSize: "16px", fontWeight: "bold" }}> FEES</div>
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
      <div>
        <Confirm
          open={exitPoolModal}
          content={`Are you sure ${user?.avatar?.toUpperCase()} ! You want to exit pool?`}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          size="small"
          style={{
            height: "max-content",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        />
      </div>
    </>
  );
};

MyRewards.propTypes = {};

MyRewards.defaultProps = {};

export default connect(mapStateToProps)(MyRewards);
