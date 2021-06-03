import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stakeGovABI } from "../abis/Stake_Gov_ABI";
import ethAddressConfig from "../abis/ethAddressConfig";
import { govTokenABI } from "../abis/Gov_Token";
import { toast } from "react-toastify";

const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  MGTBalance: state.MGTBalance,
  MYTBalance: state.MYTBalance,
});

const Staking = (props) => {
  const [tableData, setTableData] = useState([
    {
      name: "MGT-ETH-LP",
      apy: "--%",
      total_pool: "10,00.47",
      stakable: "0 BPT",
      value_stakable: "0.00",
      earned: "0 DFX",
      isExpand: false,
    },
    {
      name: "MYT-ETH-LP",
      apy: "--%",
      total_pool: "4860.47",
      stakable: "0 BPT",
      value_stakable: "0.00",
      earned: "0 DFX",
      isExpand: false,
    },
    {
      name: "MGT-POOL",
      apy: "--%",
      total_pool: "8876.47",
      stakable: "0 BPT",
      value_stakable: "0.00",
      earned: "0 DFX",
      isExpand: false,
    },
  ]);

  const showManageItem = (row, index) => {
    row.isExpand = !row.isExpand;
    tableData[index] = row;
    setTableData([...tableData]);
  };

  const [stakeValue, setStakeValue] = useState("");

  const handleStakeChange = (e) => {
    if (e.target.value) {
      const value = window.web3.utils.toWei(e.target.value.toString(), "Ether");
      setStakeValue(value);
    }
  };

  const [stakeMGTBalance, setStakeMGTBalance] = useState();

  const getStakeMGT = async () => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const stakeGovABIObject = new web3.eth.Contract(
        stakeGovABI,
        ethAddressConfig.gov_address
      );
      let stakeMGT = await stakeGovABIObject.methods
        .userInfo(props?.account)
        .call();

      setStakeMGTBalance(
        window.web3.utils.fromWei(stakeMGT?.amount.toString(), "Ether")
      );
    }
  };

  useEffect(() => {
    getStakeMGT();
  }, []);

  const handleStakeForm = async () => {
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

      try {
        await govTokenABIObject.methods
          .approve(ethAddressConfig.gov_address, stakeValue)
          .send({ from: props.account })
          .on("transactionHash", (hash) => {
            stakeGovABIObject.methods
              .deposit(stakeValue)
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
        {props.txnRows.length === 0 && (
          <small class="tag-line-error">{"No transaction item found"}</small>
        )}
      </div>
      <div class="col-lg-12 p0 pull-left smlTxt text-center">
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">Pool</div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left">APY</div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">Total Pool Value</div>
        <div class="col-lg-1 col-sm-1 pull-left">Stakable</div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">Value Staked</div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left">Earned</div>
      </div>

      {tableData.map((row, index) => {
        return (
          <>
            <div
              class="col-lg-12 p0 pull-left text-center"
              className={"col-lg-12 p0 pull-left clrWhite text-center"}
            >
              <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
                ${row.name}
              </div>
              <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
                ${row.apy}
              </div>
              <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
                ${row.total_pool}
              </div>
              <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
                {row.stakable}
              </div>
              <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
                ${row.value_stakable}
              </div>
              <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
                {row.earned}
              </div>
              <div class="col-lg-2 col-sm-2 m-t-25 pull-left">
                <a
                  onClick={() => showManageItem(row, index)}
                  class="outline-btn success-out"
                >
                  {!row.isExpand ? "Manage" : "Close"}
                </a>
              </div>
            </div>
            {/* className={row.isExpand ? 'slider' : 'slider open'} */}
            <div
              class="boxSlide"
              className={!row.isExpand ? "slider" : "slider open"}
            >
              <div
                className={
                  !row.isExpand
                    ? "col-lg-12 pull-left boxborder"
                    : "col-lg-12 pull-left boxborderslide"
                }
              >
                <div
                  className={
                    !row.isExpand
                      ? "col-lg-12 pull-left contentform"
                      : "col-lg-12 pull-left contentformslide"
                  }
                >
                  <div className="col-lg-12 pull-left text-center p-d-30">
                    {
                      "To stake, get MGT tokens by staking MGT Tokens into here."
                    }
                  </div>
                  <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
                    {/* <br/> */}
                    <i className="smlTxt">
                      Balance:{props?.MGTBalance?.claimedMGTBalance} MGT
                    </i>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.0"
                      onChange={handleStakeChange}
                    />
                    <div className="col-lg-12 m-auto">
                      <button
                        type="button"
                        onClick={handleStakeForm}
                        className="btn col-lg-12 m-t-15 btn-button btn-circular"
                      >
                        Stake
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
                    <i className="smlTxt">Staked: {stakeMGTBalance} MGT</i>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.0"
                    />
                    <div className="col-lg-11 m-auto">
                      <button
                        type="button"
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
      })}
    </div>
  );
};

Staking.propTypes = {};

Staking.defaultProps = {};

export default connect(mapStateToProps)(Staking);
