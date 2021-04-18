import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { govABI } from "../abis/Gov";
import ethAddressConfig from "../abis/ethAddressConfig";
import { tokenBalance1ABI } from "../abis/XY_Token";
import TxnService from "../services/TxnService";
import UserService from "../services/UserService";

var bigInt = require("big-integer");
const bigNumberMultiplier = 1000000000000000000;

const mapStateToProps = (state) => ({
  avatar: state.avatar,
  balance1: state.balance1,
  account: state.account,
});

const Escrow = (props) => {
  const [lockValue, setLockValue] = React.useState(0.0);
  const [unlockedUser, setUnlockedUser] = React.useState("");
  const [unlockedSelectUser, setUnlockedSelectUser] = React.useState([]);
  const [creditedUser, setCreditedUser] = React.useState([{ searchName: "" }]);
  const [useWalletValue, setUseWalletValue] = React.useState("");
  const [creditWalletValue, setCreditWalletValue] = React.useState("");
  const [showButton, setShowButton] = React.useState("false");
  const [remainderValue, setRemainderValue] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [lockingBlockNumber, setLockingBlockNumber] = React.useState("");

  const handleLock = (event) => {
    if (event.target.value === "") {
      setLockValue("");
      return;
    }
    let intValue = parseFloat(event.target.value);

    if (
      event.target.value !== "" &&
      intValue.toString() === event.target.value
    ) {
      let rem = props.balance1 / intValue;
      intValue === 0 ? setRemainderValue(0) : setRemainderValue(rem);
      setLockValue(intValue);
    } else if (intValue.toString() === "NaN") {
      setRemainderValue(0);
      setLockValue(0);
    }
  };

  const handleUseWallet = (event) => {
    setUseWalletValue(event.target.value);
  };
  const handleUnlockUser = (event) => {
    setUnlockedUser(event.target.value);
  };

  const handleCreditWallet = (index, event) => {
    creditedUser[index] = { searchName: event.target.value };
    setCreditedUser(creditedUser);
    setCreditedUser([...creditedUser]);
  };

  const getAvatarFromAccountId = async (accountId) => {
    return UserService.account(accountId).then((resolve) => {
      if (resolve.data.payload.user) {
        return resolve.data.payload.user.avatar;
      }
    });
  };

  const createPostTxn = async (avatar, event, recipientAvatar) => {
    const transaction = {
      transactionHash: event.transactionHash,
      lockId: event.returnValues.lockID,
      lockAddress: event.returnValues.lockAddress,
      unlockAddress: event.returnValues.unlockAddress,
      recipientAvatar: recipientAvatar,
      senderAvatar: avatar,
      amount: event.returnValues.amt / bigNumberMultiplier,
    };
    return TxnService.createTransaction(avatar, transaction).then((resolve) => {
      if (resolve !== undefined) {
        if (resolve.data.payload.transactions.length === 0) {
          console.log(resolve.data.payload.transactions);
        } else {
          console.log(resolve.data.payload.transactions);
          props.getTxn();
        }
      }
    });
  };

  const postTxn = async (avatar, event) => {
    let recipientAvatar = await getAvatarFromAccountId(
      event.returnValues.unlockAddress
    );
    await createPostTxn(avatar, event, recipientAvatar);
  };

  const transactionEventRefresh = async () => {
    const web3 = window.web3;
    let lockingBlockNumber = await web3.eth.getBlockNumber();
    let govABIObject;
    if (web3 !== undefined && web3.eth !== undefined) {
      govABIObject = new web3.eth.Contract(
        govABI,
        ethAddressConfig.gov_address
      );
    }

    if (lockingBlockNumber !== "" && lockingBlockNumber !== undefined) {
      await govABIObject.events
        .FunctionLockCreated({
          fromBlock: lockingBlockNumber,
          address: useWalletValue,
        })
        .on("data", (event) => {
          // we create sender and receiver transactions in DB based on the event from sender
          if (
            event.returnValues &&
            event.returnValues.lockAddress === props.account
          ) {
            setSuccessMessage("Transaction completed successfully.");
            if (lockingBlockNumber !== event.blockNumber) {
              setLockingBlockNumber(event.blockNumber);
              postTxn(props.avatar, event);
              setErrorMessage("");
              setUnlockedUser("");
              setLockValue("");
              setUnlockedSelectUser("");
              setCreditedUser([{ searchName: "" }]);
            }
          } else {
            setSuccessMessage("");
            setUnlockedUser("");
            setLockValue("");
            setUnlockedSelectUser("");
            setErrorMessage("Some error occurs. Please check the transaction");
            setTimeout(props.getTxn, 60000);
          }
        })
        .on("error", (event) => {
          setSuccessMessage("");
          setErrorMessage("Some error occurs. Please check the transaction");
        });
    }
  };

  const handleSubmit = async () => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const govABIObject = new web3.eth.Contract(
        govABI,
        ethAddressConfig.gov_address
      );
      let lockingBlockNumber = await web3.eth.getBlockNumber();
      const tokenBalance1ABIObject = new web3.eth.Contract(
        tokenBalance1ABI,
        ethAddressConfig.xy_token
      );
      let lockTime = 0;
      if (lockValue <= props.balance1) {
        const lockValueBN = bigInt(parseFloat(lockValue) * bigNumberMultiplier);
        try {
          await tokenBalance1ABIObject.methods
            .approve(ethAddressConfig.gov_address, lockValueBN.value)
            .send({ from: props.account })
            .on("transactionHash", (lockApprovedHash) => {
              govABIObject.methods
                .createFunctionLock(
                  lockValueBN.value,
                  lockTime,
                  useWalletValue,
                  creditWalletValue
                )
                .send({ from: props.account })
                .on("transactionHash", (lockAcquiredHash) => {})
                .on("error", (event) => {
                  console.log(event);
                });
            })
            .on("error", (event) => {
              console.log(event);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  const search = () => {
    UserService.userByUsername(unlockedUser).then((resolve) => {
      if (resolve.data.payload.user.userName) {
        setUseWalletValue(resolve.data.payload.user.accountId);
        setUnlockedSelectUser([
          {
            userName: resolve.data.payload.user.userName,
            accountId: resolve.data.payload.user.accountId,
          },
        ]);
        return resolve.data.payload.user.userName;
      } else {
        setUseWalletValue("");
        setUnlockedSelectUser([{ userName: "No user found", accountId: "" }]);
      }
    });
  };

  const addCreditedTo = () => {
    setCreditedUser([...creditedUser, { searchName: "" }]);
  };

  const searchCreditTo = (index) => {
    var searchData = creditedUser;
    UserService.userByUsername(searchData[index].searchName).then((resolve) => {
      if (resolve.data.payload.user.userName) {
        var newData = {
          searchName: searchData[index].searchName,
          userName: resolve.data.payload.user.userName,
          accountId: resolve.data.payload.user.accountId,
        };
        searchData[index] = newData;
        setCreditWalletValue(resolve.data.payload.user.accountId);
        setCreditedUser([...creditedUser]);
      } else {
        searchData[index] = {
          searchName: searchData[index].searchName,
          userName: "No user found",
          accountId: "",
        };
        setCreditWalletValue("");
        setCreditedUser([...creditedUser]);
      }
    });
  };

  useEffect(() => {
    transactionEventRefresh();
  }, [props.account]);

  useEffect(() => {
    if (
      creditedUser.length === 1 &&
      lockValue !== 0 &&
      useWalletValue !== "" &&
      creditWalletValue !== ""
    ) {
      setShowButton("true");
    } else {
      setShowButton("false");
    }
  }, [lockValue, useWalletValue, creditWalletValue]);

  return (
    <div class="row m-b-30 blueTxt">
      <div class="col-lg-12 m-b-30">
        {" "}
        <small class="tag-line">
          {" "}
          <i>Escrow</i>
        </small>{" "}
        {successMessage && (
          <small class="tag-line-success">{successMessage}</small>
        )}
        {errorMessage && <small class="tag-line-error">{errorMessage}</small>}
      </div>
      <div class="col-lg-2 m-t-5">
        MCT
        <br />
      </div>
      <div class="col-lg-3 ">
        <input
          type="number"
          onChange={handleLock}
          value={lockValue}
          class="form-control form-control-active"
          placeholder="Enter Amount"
        />
        <span class="smlTxt">
          {remainderValue !== 0 ? remainderValue + " times" : ""}
        </span>
      </div>
      <div class="col-lg-2 m-t-5">
        Unlocked By
        <br />
        <br /> <br />
      </div>
      <div class="col-lg-3 pull-left">
        <input
          type="text"
          onChange={handleUnlockUser}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              search();
            }
          }}
          value={unlockedUser}
          class="form-control form-control-active form-control-search"
          placeholder=""
        />
        <button className="wrapperbutton" onClick={search}>
          <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon>{" "}
        </button>
        <span class="smlTxt">This field cannot be left blank.</span>
      </div>
      {unlockedSelectUser.length >= 1 && (
        <div class="col-lg-2 pull-left">
          <select class="custom-select" value={unlockedSelectUser}>
            {unlockedSelectUser.map((option) => {
              return (
                <option value={option} key={option}>
                  {option.userName}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div class="col-lg-12 p0 ">
        {creditedUser.map((useroption, index) => {
          return (
            <div class="col-lg-12 h100 pull-left p0">
              <div class="col-lg-2 m-t-5 pull-left ">Credited To</div>
              <div class="col-lg-3 pull-left">
                <input
                  type="text"
                  onChange={(e) => handleCreditWallet(index, e)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      searchCreditTo(index);
                    }
                  }}
                  value={useroption.searchName}
                  class="form-control form-control-active form-control-search"
                  placeholder=""
                />
                <button
                  className="wrapperbutton"
                  onClick={(e) => searchCreditTo(index)}
                >
                  <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon>{" "}
                </button>
                <span class="smlTxt">
                  If left blank the unlocking avatar will choose the credited to
                </span>
              </div>

              {useroption.userName && (
                <div class="col-lg-2 pull-left">
                  <select class="custom-select" value={unlockedSelectUser}>
                    <option
                      value={useroption.userName}
                      key={useroption.userName}
                    >
                      {useroption.userName}
                    </option>
                  </select>
                </div>
              )}

              {index + 1 !== creditedUser.length && (
                <div class="col-lg-5 pull-left"></div>
              )}
              {index + 1 === creditedUser.length && (
                <div class="col-lg-3 pull-left">
                  <button
                    type="button"
                    onClick={addCreditedTo}
                    class="btn btn-primary btn-circular"
                  >
                    {" "}
                    Add additional avatars{" "}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div class="col-lg-12 p0">
        <div class="col-lg-3 m-auto">
          {showButton === "false" || creditedUser.length !== 1 ? (
            <button
              type="button"
              class="btn button btn-button btn-circular disabled"
            >
              {" "}
              Lock{" "}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              class="btn button btn-button btn-circular"
            >
              {" "}
              Lock{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Escrow.propTypes = {};

Escrow.defaultProps = {};

export default connect(mapStateToProps)(Escrow);
