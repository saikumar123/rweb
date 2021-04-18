import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Header from "./Header";
import NotificationBar from "./NotificationBar";
import MyRewards from "./MyRewards";
import Deposit from "./Deposit";
import Escrow from "./Escrow";
import TaskList from "./TaskList";
import Sidebar from "./Sidebar";
import LoginWalletOptions from "./LoginWalletOptions";
import { tokenBalance1ABI } from "../abis/XY_Token";
import ethAddressConfig from "../abis/ethAddressConfig";
import { govTokenABI } from "../abis/Gov_Token";
import { gasTokenABI } from "../abis/Gas_Token";
import { govABI } from "../abis/Gov";
import { connect } from "react-redux";

import UserService from "../services/UserService";
import TxnService from "../services/TxnService";
import {
  create_user,
  signup_user,
  set_account,
  set_balance1,
  set_balance2,
  set_balance3
} from "../redux/action";
var bigInt = require("big-integer");

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
    set_balance1: (data) => {
      set_balance1(data);
    },
    set_balance2: (data) => {
      set_balance2(data);
    },
    set_balance3: (data) => {
      set_balance3(data);
    },
  };
};

const Landing = ({ user_login, signup, set_account, set_balance1, set_balance2, set_balance3 }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [account, setAccount] = React.useState("");
  const [user, setUser] = React.useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = React.useState("deposit");
  const [txnRows, setTxnRows] = useState([]);

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



  const getBalance1 = async () => {
    console.log("Testing if this method is working");

    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const tokenBalanceABIObject = new web3.eth.Contract(
        tokenBalance1ABI,
        ethAddressConfig.xy_token
      );
      let balance1 = await tokenBalanceABIObject.methods
        .balanceOf(account)
        .call();
      balance1 = balance1 / 1000000000000000000;

      const gasTokenABIObject = new web3.eth.Contract(
        gasTokenABI,
        ethAddressConfig.gas_token
      );

      let balance2 = await gasTokenABIObject.methods
        .balanceOf(account)
        .call();
      balance2 = balance2 / 1000000000000000000;

      const govTokenABIObject = new web3.eth.Contract(
        govTokenABI,
        ethAddressConfig.gov_token_address
      );

      let balance3 = await govTokenABIObject.methods
        .balanceOf(account)
        .call();
      set_balance1(balance1);
      set_balance2(balance2);
      set_balance3(balance3);
    } else {
      console.log("web3 is not defined");
    }
  };

  const loadBlockchainData = async () => {
    await loadWeb3();
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts - " + accounts[0]);
      setAccount(accounts[0]);
    }
  };


  const getAccount = () => {
    UserService.account(account).then((resolve) => {
      console.log("resolve.data.payload.user = ", resolve.data.payload.user);

      if (resolve.data.payload.user.length === 0) {
        console.log(resolve.data.payload.user);
        setIsLogin(true);
        user_login(true);
        setIsOpen(!isOpen);

      }
      else {
        loginSuccessFull(resolve.data.payload);
      }
    });
  };

  const togglePopup = (data) => {
    
    if (data === "MetaMask") {
      console.log("MetaMast");
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
          // setIsOpen(!isOpen);
        }
      }
    }
  };

  const loginSuccessFull = (payload) => {
    console.log('loginsuccessfull')
    console.log(payload);
    setUser(payload.user);
    signup(payload.user)
    setIsLogin(true);
    user_login(true);
    console.log(" Set Account is = ", account)
    set_account(account);
    console.log(isOpen);
    togglePopup("close");
  }

  const handlePage = (page) => {
    setPage(page)
  }

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

    return getBalance1();
  };

  const updateTransaction = async (hash, senderId, receiverId, lockStatus) => {
    var newHash = hash.substring(0, hash.length - 8);
    let txnComplete = await TxnService.updateTransaction(
      senderId,
      receiverId,
      newHash,
      lockStatus
    );
    console.log("creating new promise", txnComplete);
    getTxn();
    return Promise.resolve();
  };

  const claimRewards = async () => {
    let isClaimed = false;
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
  
      const govABIObject = new web3.eth.Contract(
        govABI,
        ethAddressConfig.gas_token
      );
      try {
        return govABIObject.methods
          .claimRewards(account)
          .send({ from: account })
          .on("transactionHash", (unlockedHash) => {
          console.log("Claimed rewards");
          isClaimed=true;
          })
          .on("error", (event) => {
            console.log(event);
          })
          .catch((message) => console.log(message));
      } catch (err) {
        console.log(err);
        throw new Error("error");
      } 
    }
  return isClaimed;
  }

  const handleClaim = async () => {

    let isClaimed = claimRewards();
    if (isClaimed) {
      UserService.fetchAccount(account).then((resolve) => {
        console.log(resolve.data.payload.user);

        if (resolve.data.payload.user.length === 0) {
          console.log(resolve.data.payload.user);

        } else {
          signup(resolve.data.payload.user)

          //disable Claim button
          // loginSuccessFull(resolve.data.payload);
        }
      });
    }

    /* let transactions = [...txnRows];
     let senderId = transactions[index].lockAddress;
     let receiverId = transactions[index].unlockAddress;
     let hash = transactions[index].transactionHash;
     let lockId = transactions[index].lockId;
     let amount = transactions[index].amount;
 
     try {
       let completeHandle = await handleClaimEvent(
         senderId,
         receiverId,
         hash,
         lockId,
         amount,
         lockStatus
       );
       console.log("handle Claim  completeHandle" + completeHandle);
     } catch (err) {
       console.log(err);
     } */
  };
  const handleUnlock = async (index, lockStatus) => {
    let transactions = [...txnRows];
    let senderId = transactions[index].lockAddress;
    let receiverId = transactions[index].unlockAddress;
    let hash = transactions[index].transactionHash;
    let lockId = transactions[index].lockId;
    let amount = transactions[index].amount;

    try {
      let completeHandle = await handleUnlockEvent(
        senderId,
        receiverId,
        hash,
        lockId,
        amount,
        lockStatus
      );
      console.log("completeHandle" + completeHandle);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleClaimEvent = async (
  //   senderId,
  //   receiverId,
  //   hash,
  //   lockId,
  //   amount,
  //   lockStatus
  // ) => {
  //   return updateTransaction(hash, senderId, receiverId, lockStatus);
  // };

  const handleUnlockEvent = async (
    senderId,
    receiverId,
    hash,
    lockId,
    amount,
    lockStatus
  ) => {
    const web3 = window.web3;
    let govABIObject;
    if (web3 !== undefined && web3.eth !== undefined) {
      govABIObject = new web3.eth.Contract(
        govABI,
        ethAddressConfig.gov_address
      );
    }
    // const { toBN } = web3.utils;
    const lockValueBN = bigInt(parseFloat(amount) * 1000000000000000000);
    // const newLockValue = toBN(lockValueBN);
    try {
      return govABIObject.methods
        .unlockTokens(lockId, lockValueBN.value)
        .send({ from: account })
        .on("transactionHash", (unlockedHash) => {
          return updateTransaction(hash, senderId, receiverId, lockStatus);
        })
        .on("error", (event) => {
          console.log(event);
        })
        .catch((message) => console.log(message));
    } catch (err) {
      console.log(err);
      throw new Error("error");
    }
  };


  useEffect(() => {
    console.log("accoun - ", account)
    if (account !== "") {
      getAccount();
      getTxn();
      // handleStake();
      // getBalance2();
      // getBalance3();
    }

  }, [isLogin, account]);

  return (
    <>
      <Header user={user} isLogin={isLogin} handleLoginWallet={togglePopup} />
      {isOpen && isLogin   && (
        <LoginWalletOptions
          accountId={account}
          isLogin={isLogin}
          signup={signup}
          handleClose={togglePopup}
          loginSuccessFull={loginSuccessFull}
        />
      )}
      <NotificationBar />
      <div className="col-lg-12 col-xs-12 m-b-30 pull-left">
        <div className="col-lg-3 col-xs-12  m-b-30 pull-left">
          <Sidebar handlePage={handlePage} />
        </div>
        <div className="col-lg-9 col-xs-12 mb-140 pull-left">
          <MyRewards />
          <hr class="line"></hr>
          {isLogin && page === 'deposit' &&
            <Deposit  getBalance1={getBalance1} account={account} />

          }
          {isLogin && page === 'escrow' &&
            <Escrow getTxn={getTxn} />
          }
          {isLogin && page === 'tasklist' &&
            <TaskList lastClaimedTimeStamp={user.lastClaimedTimeStamp}
              handleUnlock={handleUnlock}
              handleClaim={handleClaim}
              txnRows={txnRows}
              isLogin={isLogin}
              avatar={user.avatar} />
          }
          {/* <TaskList /> */}
        </div>
      </div>


    </>
  )
};

export default connect(null, mapDispatchToProps)(Landing);
