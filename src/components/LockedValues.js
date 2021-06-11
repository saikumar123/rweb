import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

import { daiTokenABI } from "../abis/dai_token";

import ethAddressConfig from "../abis/ethAddressConfig";
import { tokenBalance1ABI } from "../abis/XY_Token";
import { depositABI } from "../abis/deposit";

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

  return (
    <div className="content-body-padding p-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 m-b-30">
            <div className="alert alert-info">
              <div className=" ">
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
      </div>
      <div className="tables-section">
        <div className="container-fluid">
          <div className="row m-b-30 blueTxt">
            <div className="col-lg-1 d-flex align-items-center">TVL</div>
            <div className="col-lg-3">
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={data?.totalLockedBalance}
              />
            </div>
          </div>

          <div className="row m-b-30 blueTxt">
            <div className="col-lg-1 d-flex align-items-center">DAI</div>
            <div className="col-lg-3 ">
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={data?.daiLockedBalance}
              />
            </div>
          </div>
          <div className="row m-b-30 blueTxt">
            <div className="col-lg-1 d-flex align-items-center">USDT</div>
            <div className="col-lg-3 ">
              <input type="text" className="form-control" placeholder="" />
            </div>
          </div>
          <div className="row m-b-30 blueTxt">
            <div className="col-lg-1 d-flex align-items-center">USDC</div>
            <div className="col-lg-3 ">
              <input type="text" className="form-control" placeholder="" />
            </div>
          </div>

          <div className="row m-b-30 blueTxt">
            <div className="col-lg-1 d-flex align-items-center">FLP</div>
            <div className="col-lg-3">
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={data?.FLPLockedBalance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LockedValues.propTypes = {};

LockedValues.defaultProps = {};

export default LockedValues;
