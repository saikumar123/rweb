import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { govABI } from "../abis/Gov";
import ethAddressConfig from "../abis/ethAddressConfig";
import { tokenBalance1ABI } from "../abis/XY_Token";
import TxnService from "../services/TxnService";
import UserService from "../services/UserService";
import { escrowABI } from "../abis/escrow_ABI";
import { toast } from "react-toastify";
import { Button } from "../atoms/Button/Button";

const mapStateToProps = (state) => ({
  avatar: state.avatar,
  MCTBalance: state.MCTBalance,
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
  const [unlockError, setUnlockError] = React.useState("");
  const [creditError, setCreditError] = React.useState("");
  const [amountError, setAmountError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
      let rem =
        window.web3.utils.fromWei(props?.MCTBalance?.lockedMCT, "Ether") /
        intValue;
      intValue === 0 ? setRemainderValue(0) : setRemainderValue(rem);
      setLockValue(intValue);
      setAmountError("");
    } else if (intValue.toString() === "NaN") {
      setRemainderValue(0);
      setLockValue(0);
      setAmountError("Please enter the valid amount.");
    }
  };

  const handleUseWallet = (event) => {
    setUseWalletValue(event.target.value);
  };
  const handleUnlockUser = (event) => {
    setUnlockedUser(event.target.value);
    setUnlockError("");
  };

  const handleCreditWallet = (index, event) => {
    creditedUser[index] = { searchName: event.target.value };
    setCreditedUser(creditedUser);
    setCreditedUser([...creditedUser]);
    setCreditError("");
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
      creditToAddress: event?.returnValues?.creditTo,
      creditorAvatar: await getAvatarFromAccountId(
        event?.returnValues?.creditTo
      ),
      amount: window.web3.utils.fromWei(event.returnValues.amount, "Ether"),
    };
    return TxnService.createTransaction(avatar, transaction).then((resolve) => {
      if (resolve !== undefined) {
        if (resolve.data.payload.transactions.length === 0) {
        } else {
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

    const escrowABIObject = new web3.eth.Contract(
      escrowABI,
      ethAddressConfig.escrow_Address
    );
    if (lockingBlockNumber !== "" && lockingBlockNumber !== undefined) {
      await escrowABIObject.events
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
              setRemainderValue("");
              setLockValue("");
              setUnlockedSelectUser("");
              setUnlockedSelectUser([]);
              setCreditedUser([{ searchName: "" }]);
            }
          } else {
            setSuccessMessage("");
            setUnlockedUser("");
            setLockValue("");
            setRemainderValue("");
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

  const checkValidation = () => {
    if (creditedUser.length === 1) {
    }
    if (lockValue === 0 || lockValue === "") {
      setAmountError("Please enter the valid amount.");
    }

    if (lockValue > props.MCTBalance) {
      setRemainderValue(0);
      setAmountError("Please enter amount less tha MCT.");
    }
    if (useWalletValue === "") {
      setUnlockError("Please select the valid user.");
    }
    if (creditWalletValue === "") {
      setCreditError("Please select the valid user.");
    }
  };

  const handleSubmit = async () => {
    const web3 = window.web3;

    if (web3 !== undefined && web3.eth !== undefined) {
      const escrowABIObject = new web3.eth.Contract(
        escrowABI,
        ethAddressConfig.escrow_Address
      );
      const XYZTokenABIObject = new web3.eth.Contract(
        tokenBalance1ABI,
        ethAddressConfig.xy_token
      );
      const lockValueBN = web3.utils.toWei(lockValue.toString(), "Ether");
      if (Number(lockValueBN) <= Number(props.MCTBalance.unlockedMCT)) {
        try {
          setLoading(true);
          await XYZTokenABIObject.methods
            .approve(ethAddressConfig.escrow_Address, lockValueBN)
            .send({ from: props.account })
            .on("transactionHash", async (lockApprovedHash) => {
              await escrowABIObject.methods
                .createFunctionLock(
                  lockValueBN,
                  0,
                  unlockedSelectUser[0]?.accountId,
                  creditedUser[0]?.accountId
                )
                .send({ from: props.account })
                .then((receipt) => {
                  if (receipt.status) {
                    setLoading(false);
                    toast.success("Transaction Success");
                    setUnlockedSelectUser([]);
                    setUnlockedUser("");
                    setUseWalletValue("");
                    setCreditWalletValue("");
                  }
                })
                .catch((err) => {
                  toast.error("Transaction Failed");
                  setLoading(false);
                });
            })
            .on("error", (event) => {});
        } catch (err) {
          setLoading(false);
          toast.error(err.message);
        }
      } else {
        toast.error("Not Enough MCT Balance");
      }
    }
  };

  const onSubmit = async () => {
    await handleSubmit();
  };

  const search = () => {
    UserService.userByUsername(unlockedUser).then((resolve) => {
      if (resolve?.data?.payload.user.userName) {
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

  const removeCreditTo = (index) => {
    var searchData = creditedUser;
    searchData.splice(index, 1);
    setCreditedUser([...creditedUser]);
  };

  const addCreditedTo = () => {
    setCreditedUser([...creditedUser, { searchName: "" }]);
  };

  const searchCreditTo = (index) => {
    var searchData = creditedUser;
    UserService.userByUsername(searchData[index].searchName).then((resolve) => {
      if (resolve?.data?.payload.user.userName) {
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
    setErrorMessage("");
    setSuccessMessage("");
    if (
      creditedUser.length === 1 &&
      lockValue &&
      lockValue !== 0 &&
      useWalletValue !== "" &&
      creditWalletValue !== ""
    ) {
      setShowButton("true");
    } else if (lockValue > props.MCTBalance) {
      setShowButton("false");
    } else {
      setShowButton("false");
    }
  }, [lockValue, useWalletValue, creditWalletValue]);

  return (
    <div className="row m-b-30 text-white ">
      <div className="col-lg-12 m-b-15">
        <div className=" my-4 ">
          <small
            className="tag-line font-weight-bold"
            style={{ fontSize: "20px" }}
          >
            Escrow
          </small>
        </div>
      </div>
      <div className="col-lg-2 m-t-5 ">
        FUSD
        <br />
      </div>

      <div className="col-lg-3 ">
        <input
          type="number"
          onChange={handleLock}
          value={lockValue}
          className="form-control form-control-active"
          placeholder="Enter Amount"
        />
        {/* <span className="smlTxt">
          {remainderValue !== 0 ? remainderValue + " times" : ""}
        </span> */}
        <span class="smlTxt">{amountError}</span>
      </div>
      <div className="col-lg-2 m-t-10 ">
        Unlocked By
        <br />
        <br /> <br />
      </div>
      <div className="col-lg-3 pull-left">
        <input
          type="text"
          onChange={handleUnlockUser}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              search();
            }
          }}
          value={unlockedUser}
          className="form-control form-control-active form-control-search"
          placeholder=""
        />
        <button className="wrapperbutton " onClick={search}>
          <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon>{" "}
        </button>
        <span class="smlTxt">{unlockError}</span>
      </div>
      {unlockedSelectUser.length >= 1 && (
        <div className="col-lg-2 pull-left">
          <select className="custom-select" value={unlockedSelectUser}>
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

      <div className="col-lg-12 p0 ">
        {creditedUser.map((useroption, index) => {
          return (
            <div className="col-lg-12 h100 pull-left p0">
              <div className="col-lg-2 m-t-5 pull-left ">Credited To</div>
              <div className="col-lg-3 pull-left">
                <input
                  type="text"
                  onChange={(e) => handleCreditWallet(index, e)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      searchCreditTo(index);
                    }
                  }}
                  value={useroption.searchName}
                  className="form-control form-control-active form-control-search"
                  placeholder=""
                />
                <button
                  className="wrapperbutton"
                  onClick={(e) => searchCreditTo(index)}
                >
                  <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon>{" "}
                </button>
                <span class="smlTxt">{creditError}</span>
              </div>

              {useroption.userName && (
                <div className="col-lg-2 pull-left">
                  <select className="custom-select" value={unlockedSelectUser}>
                    <option
                      value={useroption.userName}
                      key={useroption.userName}
                    >
                      {useroption.userName}
                    </option>
                  </select>
                </div>
              )}

              {index > 0 && (
                <div class="col-lg-1 m-t-5 pull-left">
                  <FontAwesomeIcon
                    title="click here to remove it"
                    onClick={(e) => removeCreditTo(index)}
                    class="icon-cursor"
                    icon={faTrash}
                  >
                    {" "}
                  </FontAwesomeIcon>
                </div>
              )}

              {index + 1 !== creditedUser.length && (
                <div className="col-lg-5 pull-left"></div>
              )}
              {/* {index + 1 === creditedUser.length && (
                <div className="col-lg-3 pull-left">
                  <button
                    type="button"
                    onClick={addCreditedTo}
                    className="btn btn-primary btn-circular"
                  >
                    {" "}
                    Add additional avatars{" "}
                  </button>
                </div>
              )} */}
            </div>
          );
        })}
      </div>

      <div className="col-lg-12 p0">
        <div className="col-lg-3 m-auto">
          {showButton === "false" || creditedUser.length !== 1 ? (
            <Button type="button" onClick={checkValidation}>
              {" "}
              Lock
            </Button>
          ) : (
            <Button type="button" onClick={onSubmit} loading={loading}>
              Lock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

Escrow.propTypes = {};

Escrow.defaultProps = {};

export default connect(mapStateToProps)(Escrow);
