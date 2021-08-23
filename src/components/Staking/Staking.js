import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stakeGovABI } from "../../abis/Stake_Gov_ABI";
import ethAddressConfig from "../../abis/ethAddressConfig";
import { govTokenABI } from "../../abis/Gov_Token";
import { toast } from "react-toastify";
import StakingForm from "./components/StakingForm";
import { StakeLPContractABI } from "../../abis/Stake_LP_Contract";
import { LPTokenABI } from "../../abis/LP_Token";

const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  MGTBalance: state.MGTBalance,
  MYTBalance: state.MYTBalance,
});

const Staking = (props) => {
  const [balance, setBalance] = useState({});

  const getAllBalances = async () => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const stakeGovABIObject = new web3.eth.Contract(
        stakeGovABI,
        ethAddressConfig.gov_address
      );
      const stakeLPContractObject = new web3.eth.Contract(
        StakeLPContractABI,
        ethAddressConfig.STAKE_LP_CONTRACT_ADDRESS
      );
      const LPTokenObject = new web3.eth.Contract(
        LPTokenABI,
        ethAddressConfig.LP_TOKEN_ADDRESS
      );

      let stakeMGT = await stakeGovABIObject.methods
        .userInfo(props?.account)
        .call();

      let stakeETHDFLBalance = await stakeLPContractObject.methods
        .userInfo(0, props?.account)
        .call();
      let stakeETHFEESBalance = await stakeLPContractObject.methods
        .userInfo(1, props?.account)
        .call();
      let LPBalance = await LPTokenObject.methods
        .balanceOf(props?.account)
        .call();

      setBalance({
        stakeDFLalance: window.web3.utils.fromWei(
          stakeMGT?.amount.toString(),
          "Ether"
        ),
        LPBalance: window.web3.utils.fromWei(LPBalance.toString(), "Ether"),

        stakeETHDFLBalance: window.web3.utils.fromWei(
          stakeETHDFLBalance?.amount.toString(),
          "Ether"
        ),
        stakeETHFEESBalance: window.web3.utils.fromWei(
          stakeETHFEESBalance?.amount.toString(),
          "Ether"
        ),
      });
    }
  };
  useEffect(() => {
    getAllBalances();
  }, []);

  const handleStakeForm = async (stakeValue, poolId) => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const stakeGovABIObject = new web3.eth.Contract(
        stakeGovABI,
        ethAddressConfig.gov_address
      );
      const govTokenABIObject = new web3.eth.Contract(
        govTokenABI,
        ethAddressConfig.gov_token_address
      );

      const convertStakeValue = window.web3.utils.toWei(
        stakeValue.toString(),
        "Ether"
      );
      const stakeLPContractObject = new web3.eth.Contract(
        StakeLPContractABI,
        ethAddressConfig.STAKE_LP_CONTRACT_ADDRESS
      );

      const LPTokenObject = new web3.eth.Contract(
        LPTokenABI,
        ethAddressConfig.LP_TOKEN_ADDRESS
      );
      if (poolId) {
        try {
          await LPTokenObject.methods
            .approve(
              ethAddressConfig.STAKE_LP_CONTRACT_ADDRESS,
              convertStakeValue
            )
            .send({ from: props.account })
            .on("transactionHash", (hash) => {
              stakeLPContractObject.methods
                .deposit(convertStakeValue, Number(poolId))

                .send({ from: props.account })
                .then((receipt) => {
                  if (receipt.status) {
                    toast.success("Transaction Success");
                  }
                })
                .catch((err) => {
                  toast.error("Transaction Failed");
                });
            });
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        try {
          await govTokenABIObject.methods
            .approve(ethAddressConfig.gov_address, convertStakeValue)
            .send({ from: props.account })
            .on("transactionHash", (hash) => {
              stakeGovABIObject.methods
                .deposit(convertStakeValue)

                .send({ from: props.account })
                .then((receipt) => {
                  if (receipt.status) {
                    toast.success("Transaction Success");
                  }
                })
                .catch((err) => {
                  toast.error("Transaction Failed");
                });
            });
        } catch (err) {
          toast.error(err.message);
        }
      }
    }
  };

  return (
    <div class="row m-b-30 blueTxt">
      <div class="col-lg-12 m-b-15">
        <div className=" my-4 ">
          <small
            className="tag-line font-weight-bold"
            style={{ fontSize: "20px" }}
          >
            Staking
          </small>
        </div>
      </div>
      <div class="col-lg-12 p0 pull-left smlTxt text-center">
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">Pool</div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left">APY</div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">Total Pool Value</div>
        <div class="col-lg-1 col-sm-1 pull-left">Stakable</div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">Value Staked</div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left">Earned</div>
      </div>

      <StakingForm
        data={{
          name: "DFL-ETH-LP",
          apy: "--%",
          total_pool: "10,00.47",
          stakable: "0 BPT",
          value_stakable: "0.00",
          earned: "0 DFX",
          isExpand: false,
          poolId: "0",
        }}
        stakeBalance={balance?.stakeETHDFLBalance}
        handleStakeForm={handleStakeForm}
        MGTBalance={balance.LPBalance}
      />

      <StakingForm
        data={{
          name: "FEES-ETH-LP",
          apy: "--%",
          total_pool: "4860.47",
          stakable: "0 BPT",
          value_stakable: "0.00",
          earned: "0 DFX",
          isExpand: false,
          poolId: "1",
        }}
        stakeBalance={balance?.stakeETHFEESBalance}
        handleStakeForm={handleStakeForm}
        MGTBalance={balance.LPBalance}
      />

      <StakingForm
        data={{
          name: "DFL-POOL",
          apy: "--%",
          total_pool: "8876.47",
          stakable: "0 BPT",
          value_stakable: "0.00",
          earned: "0 DFX",
          isExpand: false,
        }}
        stakeBalance={balance?.stakeDFLalance}
        handleStakeForm={handleStakeForm}
        MGTBalance={props?.MGTBalance?.claimedMGTBalance}
      />
    </div>
  );
};

Staking.propTypes = {};

Staking.defaultProps = {};

export default connect(mapStateToProps)(Staking);
