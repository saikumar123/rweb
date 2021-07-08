import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Header from "../Header";
import NotificationBar from "../NotificationBar";

import Sidebar from "./components/Sidebar";

import { depositABI } from "../../abis/deposit";

import LoginWalletOptions from "../LoginWalletOptions";

import ethAddressConfig from "../../abis/ethAddressConfig";
import { govTokenABI } from "../../abis/Gov_Token";
import { gasTokenABI } from "../../abis/Gas_Token";
import { connect } from "react-redux";

import UserService from "../../services/UserService";
import TxnService from "../../services/TxnService";
import {
  create_user,
  signup_user,
  set_account,
  set_MCT_balance,
  set_MGT_balance,
  set_MYT_balance,
} from "../../redux/action";
import LockedValues from "../LockedValues";
import { tokenBalance1ABI } from "../../abis/XY_Token";
import { stakeGovABI } from "../../abis/Stake_Gov_ABI";
import { stakeABI } from "../../abis/Stake";
import UserLanding from "./components/UserLanding";
import AdminLanding from "./components/AdminLanding";
import { escrowABI } from "../../abis/escrow_ABI";

const mapDispatchToProps = (data) => {
  return {
    user_login: (data) => {
      create_user(data);
    },
    signup: (data) => {
      signup_user(data);
    },

    set_account: (data) => {
      set_account(data);
    },
    set_MCT_balance: (data) => {
      set_MCT_balance(data);
    },
    set_MGT_balance: (data) => {
      set_MGT_balance(data);
    },
    set_MYT_balance: (data) => {
      set_MYT_balance(data);
    },
  };
};

const Landing = ({
  user_login,
  signup,
  set_account,
  set_MCT_balance,
  set_MGT_balance,
  set_MYT_balance,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [account, setAccount] = React.useState("");
  const [user, setUser] = React.useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const [page, setPage] = React.useState("");
  const [txnRows, setTxnRows] = useState([]);
  const [totalPoolBalance, setTotalPoolBalance] = useState(0);

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

  const getAllBalance = async () => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      //For MCT Balance
      const depositABIObject = new web3.eth.Contract(
        depositABI,
        ethAddressConfig.deposit_Address
      );

      const XYZTokenABIObject = new web3.eth.Contract(
        tokenBalance1ABI,
        ethAddressConfig.xy_token
      );
      let unlockedMCTBalance = await XYZTokenABIObject.methods
        .balanceOf(account)
        .call();

      let lockMCTBalance = await depositABIObject.methods
        .userInfoMCT(account)
        .call();

      set_MCT_balance({
        lockedMCT: lockMCTBalance?.lockedMCT,
        unlockedMCT: unlockedMCTBalance,
      });

      // for total pool balance
      let totalBalance = await depositABIObject.methods
        .totalPoolBalance(account)
        .call();
      setTotalPoolBalance(totalBalance);

      // For MGT Balance
      const govTokenABIObject = new web3.eth.Contract(
        govTokenABI,
        ethAddressConfig.gov_token_address
      );

      const stakeGovABIObject = new web3.eth.Contract(
        stakeGovABI,
        ethAddressConfig.gov_address
      );
      const escrowABIObject = new web3.eth.Contract(
        escrowABI,
        ethAddressConfig.escrow_Address
      );

      let claimedMGTBalance = await govTokenABIObject.methods
        .balanceOf(account)
        .call();
      let stakeGovPendingRewards = await stakeGovABIObject.methods
        .pendingRewards(account)
        .call();
      let escowGovRewards = await escrowABIObject.methods
        .govRewards(account)
        .call();
      let escowGovPendingRewards = await escrowABIObject.methods
        .pendpendingGovRewards(account)
        .call();

      let unClaimedMGTBalance =
        Number(stakeGovPendingRewards) +
        Number(escowGovRewards) +
        Number(escowGovPendingRewards);

      set_MGT_balance({
        claimedMGTBalance: claimedMGTBalance
          ? web3.utils.fromWei(claimedMGTBalance, "Ether")
          : 0,
        unClaimedMGTBalance: unClaimedMGTBalance
          ? web3.utils.fromWei(unClaimedMGTBalance.toString(), "Ether")
          : 0,
        stakeGovPendingRewards: stakeGovPendingRewards
          ? web3.utils.fromWei(stakeGovPendingRewards.toString(), "Ether")
          : 0,

        escowGovRewards: escowGovRewards
          ? web3.utils.fromWei(escowGovRewards.toString(), "Ether")
          : 0,

        escowGovPendingRewards: escowGovPendingRewards
          ? web3.utils.fromWei(escowGovPendingRewards.toString(), "Ether")
          : 0,
      });

      // For MYT Balance
      const gasTokenABIObject = new web3.eth.Contract(
        gasTokenABI,
        ethAddressConfig.gas_token
      );

      const stakeABIObject = new web3.eth.Contract(
        stakeABI,
        ethAddressConfig.stake_address
      );

      let claimedMYTBalance = await gasTokenABIObject.methods
        .balanceOf(account)
        .call();
      let unClaimedMYTBalance = await stakeABIObject.methods
        .pendingRewards(account)
        .call();

      set_MYT_balance({
        claimedMYTBalance: claimedMYTBalance
          ? web3.utils.fromWei(claimedMYTBalance, "Ether")
          : 0,
        unClaimedMYTBalance: unClaimedMYTBalance
          ? web3.utils.fromWei(unClaimedMYTBalance, "Ether")
          : 0,
      });
    } else {
      console.log("web3 is not defined");
    }
  };

  const loadBlockchainData = async () => {
    await loadWeb3();
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
  };

  const getAccount = () => {
    UserService.account(account).then((resolve) => {
      if (resolve?.data.payload.user.length === 0) {
        setIsLogin(true);
        user_login(true);
        setIsOpen(!isOpen);
      } else {
        loginSuccessFull(resolve?.data.payload);
      }
    });
  };

  const togglePopup = (data) => {
    if (data === "MetaMask") {
      loadBlockchainData();
    }
    if (data === "open") {
      if (account !== "") {
        getAccount();
      } else if (!isOpen) {
        setIsOpen(!isOpen);
      }
    } else {
      if (data === "close") {
        if (isOpen) {
          setIsOpen(!isOpen);
        }
      }
    }
  };

  const loginSuccessFull = (payload) => {
    setUser(payload?.user);
    signup(payload?.user);
    setIsLogin(true);
    user_login(true);
    set_account(account);
    togglePopup("close");
  };

  const handlePage = (page) => {
    if (isLogin) {
      setPage(page);
    }
  };

  const getTxn = () => {
    if (user.avatar !== "" && user.avatar !== undefined) {
      TxnService.fetchTransaction(user.avatar).then((resolve) => {
        if (resolve.data.payload.transactions.length === 0) {
          console.log(resolve.data.payload.transactions);
        } else {
          console.log(resolve.data.payload.transactions);
          setTxnRows(resolve.data.payload.transactions);
        }
      });
    }

    return getAllBalance();
  };

  useEffect(() => {
    if (account !== "") {
      getAccount();
      getTxn();
    }
  }, [account]);

  useEffect(() => {
    if (account !== "") {
      getTxn();
    }
  }, [user]);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          background: "#000",
          zIndex: "9",
          padding: "10px 0",
        }}
      >
        <Header
          user={user}
          isLogin={isLogin}
          handleLoginWallet={togglePopup}
          setShowAdminPanel={setShowAdminPanel}
          showAdminPanel={showAdminPanel}
          account={account}
        />
        <NotificationBar />
      </div>
      <div style={{ paddingTop: "80px" }}>
        {isOpen && isLogin && (
          <LoginWalletOptions
            accountId={account}
            isLogin={isLogin}
            signup={signup}
            handleClose={togglePopup}
            loginSuccessFull={loginSuccessFull}
          />
        )}

        <div className="col-lg-12 col-xs-12 p-b-30 pull-left">
          <div
            className="col-lg-3 col-xs-12  p-b-30 pull-left"
            style={{ position: "fixed" }}
          >
            <Sidebar
              handlePage={handlePage}
              page={page}
              showAdminPanel={showAdminPanel}
              taskListCount={
                txnRows?.filter((obj) => obj?.lockStatus === "UNLOCK").length
              }
            />
          </div>
          <div
            className="col-lg-9 col-xs-12 pd-top pull-left "
            style={{ overflow: "hidden", marginLeft: "25%" }}
          >
            <div
              style={{
                background: "black",
                position: "absolute",
                height: "100%",
                width: "100%",
                opacity: "0.6",
                borderRadius: "40px",
              }}
            ></div>
            <div>
              <div className="p-5">
                {!isLogin && <LockedValues />}
                {isLogin && !showAdminPanel && (
                  <UserLanding
                    getAllBalance={getAllBalance}
                    user={user}
                    page={page}
                    account={account}
                    totalPoolBalance={totalPoolBalance}
                    txnRows={txnRows}
                    getTxn={getTxn}
                  />
                )}{" "}
                {isLogin && showAdminPanel && <AdminLanding page={page} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Landing);
