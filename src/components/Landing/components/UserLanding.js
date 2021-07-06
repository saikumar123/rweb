import React, { useState } from "react";
import MyRewards from "../../MyRewards";
import Deposit from "../../Deposit/Deposit";
import Escrow from "../../Escrow";
import TaskList from "../../TaskList";
import Staking from "../../Staking";
import TransactionList from "../../TransactionList";
import TransactionListTable from "../../TransactionListTable";

import ethAddressConfig from "../../../abis/ethAddressConfig";

import { govABI } from "../../../abis/Gov";
import { connect } from "react-redux";

import UserService from "../../../services/UserService";
import TxnService from "../../../services/TxnService";

import { escrowABI } from "../../../abis/escrow_ABI";

import { toast } from "react-toastify";
import Faucets from "../../Faucets/Faucets";

const mapDispatchToProps = (data) => {
  return null;
};

const UserLanding = ({
  signup,
  getAllBalance,
  user,
  page,
  account,
  totalPoolBalance,
  txnRows,
  getTxn,
}) => {
  const [unLockLoader, setUnlockLoader] = useState(false);

  const updateTransaction = async (hash, senderId, receiverId, lockStatus) => {
    var newHash = hash.substring(0, hash.length - 8);
    let txnComplete = await TxnService.updateTransaction(
      senderId,
      receiverId,
      newHash,
      lockStatus
    );
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
            isClaimed = true;
          })
          .on("error", (event) => {})
          .catch((message) => console.log(message));
      } catch (err) {
        throw new Error("error");
      }
    }
    return isClaimed;
  };

  const handleClaim = async () => {
    let isClaimed = claimRewards();
    if (isClaimed) {
      UserService.fetchAccount(account).then((resolve) => {
        console.log(resolve.data.payload.user);

        if (resolve.data.payload.user.length === 0) {
          console.log(resolve.data.payload.user);
        } else {
          signup(resolve.data.payload.user);
        }
      });
    }
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

  const handleUnlockEvent = async (
    senderId,
    receiverId,
    hash,
    lockId,
    amount,
    lockStatus
  ) => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const escrowABIObject = new web3.eth.Contract(
        escrowABI,
        ethAddressConfig.escrow_Address
      );

      const lockValueBN = web3.utils.toWei(amount.toString(), "Ether");
      try {
        setUnlockLoader(true);
        await escrowABIObject.methods
          .unlockTokens(lockId, lockValueBN)
          .send({ from: account })
          .on("receipt", (receipt) => {
            toast.success("Transaction Success");
            setUnlockLoader(false);
            updateTransaction(hash, senderId, receiverId, lockStatus);
          });
      } catch (err) {
        setUnlockLoader(false);
        toast.error(err?.message);
      }
    }
  };

  return (
    <>
      {page !== "transactions" && page !== "faucets" && (
        <MyRewards
          account={account}
          getAllBalance={getAllBalance}
          user={user}
          totalPoolBalance={totalPoolBalance}
        />
      )}
      {page === "faucets" && (
        <>
          <hr class="line"></hr>
          <Faucets getAllBalance={getAllBalance} account={account} />
        </>
      )}

      {page === "deposit" && (
        <>
          <hr class="line"></hr>
          <Deposit getAllBalance={getAllBalance} account={account} />
        </>
      )}
      {page === "escrow" && (
        <>
          <hr class="line"></hr>
          <Escrow getTxn={getTxn} />
        </>
      )}
      {page === "tasklist" && (
        <>
          <hr class="line"></hr>
          <TaskList
            lastClaimedTimeStamp={user.lastClaimedTimeStamp}
            handleUnlock={handleUnlock}
            unLockLoader={unLockLoader}
            handleClaim={handleClaim}
            txnRows={txnRows}
            avatar={user.avatar}
          />{" "}
        </>
      )}
      {page === "staking" && (
        <>
          <hr class="line"></hr>
          <Staking txnRows={txnRows} account={account} />
        </>
      )}
      {page === "transactions" && (
        <>
          <TransactionListTable txnRows={txnRows} />
          <hr class="line"></hr>
          <TransactionList txnRows={txnRows} />{" "}
        </>
      )}
    </>
  );
};

export default connect(null, mapDispatchToProps)(UserLanding);
