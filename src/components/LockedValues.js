import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

import { daiTokenABI } from "../abis/dai_token";

import ethAddressConfig from "../abis/ethAddressConfig";
import { tokenBalance1ABI } from "../abis/XY_Token";
import { depositABI } from "../abis/deposit";
import { Loader } from "semantic-ui-react";

const LockedValues = () => {
  const [data, setData] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    return;
  };

  const convertBigInt = (value) => {
    return window.web3.utils.fromWei(value, "Ether");
  };

  const getLockedBalance = useCallback(async () => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const daiTokenABIObject = new web3.eth.Contract(
        daiTokenABI,
        ethAddressConfig.dai_token
      );
      const XYZTokenABIObject = new web3.eth.Contract(
        tokenBalance1ABI,
        ethAddressConfig.xy_token
      );

      const depositABIObject = new web3.eth.Contract(
        depositABI,
        ethAddressConfig.deposit_Address
      );
      let totalLockedBalance = await daiTokenABIObject.methods
        .balanceOf(ethAddressConfig?.deposit_Address)
        .call();

      let daiLockedBalance = await daiTokenABIObject.methods
        .balanceOf(ethAddressConfig?.deposit_Address)
        .call();

      let FLPLockedBalance = await XYZTokenABIObject.methods
        .balanceOf(ethAddressConfig?.stake_address)
        .call();

      setData({
        totalLockedBalance: convertBigInt(totalLockedBalance),
        daiLockedBalance: convertBigInt(daiLockedBalance),
        FLPLockedBalance: convertBigInt(FLPLockedBalance),
      });
    } else {
      console.log("web3 is not defined");
    }
  }, []);

  useEffect(() => {
    loadWeb3();
    getLockedBalance();
  }, [getLockedBalance]);

  const Pools = [
    {
      label: "DAI",
      amount: data?.totalLockedBalance,
      apr: "10%",
    },
    {
      label: "USDT",
      amount: data?.totalLockedBalance,
      apr: "20%",
    },
    {
      label: "USDC",
      amount: data?.totalLockedBalance,
      apr: "30%",
    },
    {
      label: "FLP",
      amount: data?.FLPLockedBalance,
      apr: "30%",
    },
  ];

  return (
    <div className="content-body-padding p-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 m-b-30">
            <div className=" my-4 ">
              <small
                className="tag-line font-weight-bold"
                style={{ fontSize: "20px" }}
              >
                Protocol Locked Values
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="tables-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5 d-flex align-items-center justify-content-center  mx-auto m-b-30 blueTxt ">
              <div className="poolCard">
                <div className="text-center label">TVL</div>
                {data ? (
                  <>
                    <div className="amount ">
                      <span>Locked Amount:</span> {data?.totalLockedBalance}
                    </div>
                    <div className="apr ">
                      <span>APR:</span> 20%
                    </div>
                  </>
                ) : (
                  <div className="mt-3">
                    <Loader active size="small" inverted inline="centered" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {Pools.map((obj) => (
              <div className=" col-5 d-flex align-items-center justify-content-center  m-auto mb-5 blueTxt ">
                <div className="poolCard">
                  <div className=" text-center label">{obj?.label}</div>

                  {data ? (
                    <>
                      <div className="amount ">
                        <span>Locked Amount:</span> {obj?.amount}
                      </div>
                      <div className="apr ">
                        <span>APR:</span> {obj?.apr}
                      </div>
                    </>
                  ) : (
                    <div className="mt-3">
                      <Loader active size="small" inverted inline="centered" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

LockedValues.propTypes = {};

LockedValues.defaultProps = {};

export default LockedValues;
