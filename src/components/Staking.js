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
      name: "DFL-ETH-LP",
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
      name: "DFL-POOL",
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

  const [stakeValue, setStakeValue] = useState(0);

  const handleStakeChange = (e) => {
    if (e.target.value) {
      setStakeValue(e.target.value);
    }
  };

  const [unStakeValue, setUnStakeValue] = useState("");

  const handleUnStakeChange = (e) => {
    if (e.target.value) {
      setUnStakeValue(e.target.value);
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

      const convertStakeValue = window.web3.utils.toWei(
        stakeValue.toString(),
        "Ether"
      );

      try {
        await govTokenABIObject.methods
          .approve(ethAddressConfig.gov_address, convertStakeValue)
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

  const handleStakeMaxAmount = () => {
    setStakeValue(props?.MGTBalance?.claimedMGTBalance);
  };

  const handleUnStakeMaxAmount = () => {
    setUnStakeValue(stakeMGTBalance);
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
                  <div
                    className="position-absolute "
                    style={{
                      fontSize: "28px",
                      right: "2rem",
                      top: "1rem",
                      zIndex: "9",
                      cursor: "pointer",
                    }}
                    onClick={() => showManageItem(row, index)}
                  >
                    <i class="fa fa-times text-white"></i>
                  </div>

                  <div className="col-lg-12 pull-left text-center p-d-30">
                    {
                      "To stake, get DFL tokens by staking DFL Tokens into here."
                    }
                  </div>
                  <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
                    {/* <br/> */}
                    <i className="smlTxt">
                      Balance:{props?.MGTBalance?.claimedMGTBalance} DFL
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
                        onClick={handleStakeForm}
                        className="btn col-lg-12 m-t-15 btn-button btn-circular"
                      >
                        Stake
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
                    <i className="smlTxt">Staked: {stakeMGTBalance} DFL</i>
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
