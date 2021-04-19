import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'

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
  all_users: state.all_users,
  count: state.task_count
});


const Escrow = (props) => {
  const [lockValue, setLockValue] = React.useState(0.0)
  const [unlockedUser, setUnlockedUser] = React.useState("");
  const [unlockedSelectUser, setUnlockedSelectUser] = React.useState([]);
  const [creditedUser, setCreditedUser] = React.useState([{searchName:''}]);
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
  
  

  const handleLock = (event) => {
    console.log("event.target.value = ",event.target.value)
    if(event.target.value === '') {
      setLockValue('')
      return;
    }
    let intValue = parseFloat(event.target.value);
    
    if (
      event.target.value !== "" &&
      intValue.toString() === event.target.value
    ) {
      let rem = props.balance1 / intValue;
      console.log(rem);
      intValue === 0 ? setRemainderValue(0) : setRemainderValue(rem);

      setLockValue(intValue);

      console.log(event.target.value);
      console.log(intValue);
      console.log(lockValue);
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
    setUnlockError("");
  };
  
  const handleCreditWallet = (index, event) => {
    console.log("event.target.value = ",event.target.value)
    creditedUser[index]={searchName:event.target.value}
    setCreditedUser(creditedUser);
    setCreditedUser([...creditedUser,]);
    setCreditError("")
  };

  const getAvatarFromAccountId = async (accountId) => {
    return UserService.account(accountId).then((resolve) => {
      console.log("resolve.data.payload.user =",resolve.data.payload.user)
      if (resolve.data.payload.user) {
        
        return resolve.data.payload.user.avatar;
      }
    });
  };

  const createPostTxn = async (avatar ,event, recipientAvatar) => {
    const transaction = {
      transactionHash: event.transactionHash,
      lockId: event.returnValues.lockID,
      lockAddress: event.returnValues.lockAddress,
      unlockAddress: event.returnValues.unlockAddress,
      recipientAvatar: recipientAvatar,
      senderAvatar: avatar,
      amount : event.returnValues.amt/ bigNumberMultiplier
    };   
    console.log("transaction = ",transaction)
   return  TxnService.createTransaction(avatar, transaction).then((resolve) => {
     if(resolve !== undefined){
      if (resolve.data.payload.transactions.length === 0) {
        console.log(resolve.data.payload.transactions);
      } else {
        console.log(resolve.data.payload.transactions);
        props.getTxn();
      }
    }
    });
  }

  const postTxn = async (avatar,event) => {
    console.log("event.returnValues.unlockAddress = ",event.returnValues.unlockAddress)
    let recipientAvatar = await getAvatarFromAccountId(event.returnValues.unlockAddress);
    console.log("recipientAvatar = ",recipientAvatar)
    await createPostTxn(avatar ,event, recipientAvatar);
    
  };

  const transactionEventRefresh = async ()  => {
    console.log('23131');
    const web3 = window.web3;
    let lockingBlockNumber = await web3.eth.getBlockNumber();
    let govABIObject;
    if (web3 !== undefined && web3.eth !== undefined) {
      govABIObject =  new web3.eth.Contract(govABI,ethAddressConfig.gov_address);
    }
  
  if(lockingBlockNumber !== '' && lockingBlockNumber !== undefined) {
    console.log("lockingBlockNumber ==> ",lockingBlockNumber);
    await govABIObject.events
    .FunctionLockCreated({ fromBlock: lockingBlockNumber,
      address:useWalletValue
    })
    .on("data", (event) => {
      console.log("Event received --> ",event, props.account)
      // we create sender and receiver transactions in DB based on the event from sender
      if(event.returnValues && event.returnValues.lockAddress === props.account) {
       console.log('if .. ', event.returnValues.lockAddress, props.account);
       setSuccessMessage("Transaction completed successfully.");
       console.log("lockingBlockNumber = ",lockingBlockNumber)
       console.log("event = ",event)
       if(lockingBlockNumber !== event.blockNumber) {
        setLockingBlockNumber(event.blockNumber)
        postTxn(props.avatar, event);
        setErrorMessage("");
        setUnlockedUser("");
        setLockValue("");
        setUnlockedSelectUser("")
        setCreditedUser([{searchName:''}])
       }
      }  else{
          setSuccessMessage("");
          setUnlockedUser("");
          setLockValue("");
          setUnlockedSelectUser("")
          setErrorMessage("Some error occurs. Please check the transaction");
        console.log('else',event)
        console.log("props.count = ",props.count)
        props.task_count(props.count+1)
        props.setTaskCount(props.count+1)
        setTimeout(props.getTxn,60000)        
      }
     
  }).on('error', (event) => {
    setSuccessMessage("");
    setErrorMessage("Some error occurs. Please check the transaction");
    console.log(event);
  })
  }
  }

  const handleSubmit = async () => {

    console.log("useWalletValue ==> ", useWalletValue);
    console.log("creditWalletValue = ",creditWalletValue)
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
      // const { toBN } = web3.utils;
console.log(lockValue, useWalletValue, props.account )
      if (lockValue <= props.balance1) {
      //  const lockValueBN = parseFloat(lockValue) * 1000000000000000000;
        const lockValueBN = bigInt(parseFloat(lockValue) * bigNumberMultiplier); 
        // const newLockValue = toBN(lockValueBN);
        try  {
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
              .on('error', (event) => {
                console.log(event);
              });
          }).on('error', (event) => {
            console.log(event);
          });
       //   lockingBlockNumber = await web3.eth.getBlockNumber();
        // let recipientAvatar = await getAvatarFromAccountId(useWalletValue);
        // let lockedEvent;
        // await govABIObject.events
        //   .FunctionLockCreated({ fromBlock: lockingBlockNumber,
        //     address:useWalletValue
        //   })
        //   .on("data", (event) => {
        //     console.log("successful event is -", event)
        //     lockedEvent = event;
        //     if (lockedEvent) {
        //       if (lockedEvent.returnValues) {
        //         postTxn(props.avatar, lockedEvent, lockValue, recipientAvatar);
        //       }
        //     }
        //   });
        }catch (err) {
          console.log(err);
        }
      }
    }
  };
  const setUserAccount = () => {
    console.log("setUserAccount = props.all_users",props.all_users)
    let user = props.all_users.filter(user => {
      return user.avatar === unlockedUser;
    });
    console.log("nall_users = ",user)
    if (user.length>0) {
      user = user[0]
      if(user.avatar === props.avatar){
        setUseWalletValue('')
        setUnlockedSelectUser([{userName: "Select another User", accountId: ""}])
        setUnlockError("You can not select own avatar")
        
      }else{
        setUseWalletValue(user.accountId);
        setUnlockedSelectUser([{userName: user.userName, accountId: user.accountId}])
      }
      
      return user.userName;
    }else{
      setUseWalletValue('')
      setUnlockedSelectUser([{userName: "No user found", accountId: ""}])
    }
  }
  const searchUser = () => {
    console.log("all_users = ",props.all_users)
    if(props.all_users === undefined){
      UserService.allUsers().then((resolve) => {
        console.log("allUsers = ",resolve.data)
        props.set_allusers(resolve.data.payload.user)
        
      });
    }
    
  }
  // const search = () => {
  //     console.log("unlockedUser = ",unlockedUser)
  //     UserService.userByUsername(unlockedUser).then((resolve) => {
  //       if (resolve.data.payload.user.userName) {
  //         setUseWalletValue(resolve.data.payload.user.accountId);
  //         setUnlockedSelectUser([{userName: resolve.data.payload.user.userName, accountId: resolve.data.payload.user.accountId}])
  //         return resolve.data.payload.user.userName;
  //       }else{
  //         setUseWalletValue('')
  //         setUnlockedSelectUser([{userName: "No user found", accountId: ""}])
  //       }
  //     });
  // }
  
  const addCreditedTo = () => {
    // console.log(creditedUser)
    // let newCreditedUser = creditedUser;
    // newCreditedUser.push({})
    setCreditedUser([...creditedUser,{searchName:''}]);
  }
  const searchCreditTo = (index) => {
    console.log("all_users = ",props.all_users)
    if(props.all_users === undefined){
      UserService.allUsers().then((resolve) => {
        console.log("allUsers = ",resolve.data)
        props.set_allusers(resolve.data.payload.user)
        searchCreditToUser(index)
      });
    }else{
      searchCreditToUser(index)
    }
    
  }
  const searchCreditToUser = (index) => {
    var searchData = creditedUser;
    console.log("event.target.value index = ",searchData)
    let user = props.all_users.filter(user => {
      return user.avatar === searchData[index].searchName;
    });
    
    if (user.length>0) {
      user = user[0];
      console.log(user.userName)
      var newData = {searchName: searchData[index].searchName, userName: user.userName, accountId: user.accountId}
      searchData[index] = newData
      setCreditWalletValue(user.accountId)
      setCreditedUser([...creditedUser,]);
      console.log("searchData ==  ",searchData)
      
    }else{
      searchData[index] = {searchName: searchData[index].searchName, userName: "No user found", accountId: ""}
      setCreditWalletValue("")
      setCreditedUser([...creditedUser,]);
    }
  }

  const removeCreditTo = (index) => {
    
    var searchData = creditedUser;
    searchData.splice(index, 1);
    setCreditedUser([...creditedUser,]);

  }
  
  const checkValidation = () => {
    if (creditedUser.length === 1){}
    if (lockValue === 0 || lockValue === ""){
      setAmountError("Please enter the valid amount.")
    }
    
    if (lockValue > props.balance1){
      setRemainderValue(0);
      setAmountError("Please enter amount less tha MCT.")
    }
    if (useWalletValue === ""){
      setUnlockError("Please select the valid user.")
    } 
    if(creditWalletValue === "") {
      setCreditError("Please select the valid user.")
    } 
  }

  useEffect(() => {
    searchUser();
    transactionEventRefresh();
  },[props.account])

  useEffect(() => {
    console.log("creditedUser.length = ",creditedUser.length)
    console.log("lockValue = ",lockValue)
    console.log("props.balance1 = ",props.balance1)
    console.log("useWalletValue = ",useWalletValue)
    console.log("creditWalletValue = ",creditWalletValue)
    if (creditedUser.length === 1 && lockValue < props.balance1 && lockValue !== 0 && useWalletValue !== "" && creditWalletValue !== "") {
      setShowButton("true");
    } else {
      setShowButton("false");
    }
    console.log(showButton);
  }, [lockValue, useWalletValue, creditWalletValue]);


  return (
  <div class="row m-b-30 blueTxt" id="escrow">
    <div class="col-lg-12 m-b-30">
      {" "}
      <small class="tag-line">
        {" "}
        <i>Escrow</i>
      </small>{" "}
      {successMessage &&
        <small class="tag-line-success">
          {successMessage}    
        </small>
      }
      {errorMessage &&
        <small class="tag-line-error">
          {errorMessage}    
        </small>
      }
    </div>
    <div class="col-lg-2 m-t-5">
      MCT
      <br />
      
    </div>
    <div class="col-lg-3 ">
      <input type="number"  onChange={handleLock}
            value={lockValue}
            class="form-control form-control-active" placeholder="Enter Amount" />
            <span class="smlTxt">{remainderValue !== 0 ? remainderValue + " times" : amountError}</span>

    </div>
    <div class="col-lg-2 m-t-5">
      Unlocked By
      
      <br />
      
      <br /> <br />
      
      
    </div>
    <div class="col-lg-3 pull-left">
      <input type="text"
        onChange={handleUnlockUser}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            setUserAccount()
          }
        }}
        value={unlockedUser} class="form-control form-control-active form-control-search" placeholder="" />
        <button className="wrapperbutton" onClick={setUserAccount}>
        <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon>  </button>
      <span class="smlTxt">{unlockError}</span>
    </div>
    {unlockedSelectUser.length >= 1 &&
      <div class="col-lg-2 pull-left">
        <select class="custom-select"  value={unlockedSelectUser}>
        {unlockedSelectUser.map((option) => {
              return (
                <option value={option} key={option}>
                  {option.userName}
                </option>
              );
            })
          }
        </select>
      </div>
    }
    
    <div class="col-lg-12 p0 ">
    {creditedUser.map((useroption, index) => {
      return (<div class="col-lg-12 h100 pull-left p0">
      <div class="col-lg-2 m-t-5 pull-left ">
        Credited To
      </div>
      <div class="col-lg-3 pull-left">
        <input type="text" onChange={(e) => handleCreditWallet(index, e)}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    searchCreditTo(index)
                  }
                }}
                value={useroption.searchName} class="form-control form-control-active form-control-search" placeholder="" />
          <button className="wrapperbutton" onClick={(e) => searchCreditTo(index)}>
          <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon>  </button>
          <span class="smlTxt">
            {creditError}
          </span>
      </div>
      
      
      { useroption.userName &&
      <div class="col-lg-2 pull-left">
        <select class="custom-select "  value={unlockedSelectUser}>
                <option value={useroption.userName} key={useroption.userName}>
                  {useroption.userName}
                </option>
        </select>
        </div>
        
      }
      { index > 0 &&
        <div class="col-lg-1 m-t-5 pull-left">
          <FontAwesomeIcon title="click here to remove it" onClick={(e) => removeCreditTo(index)} class="icon-cursor" icon={faTrash}> </FontAwesomeIcon> 
        </div>
      }
      
      { index+1 !== creditedUser.length &&
            <div class="col-lg-5 pull-left"></div>
      }
      { index+1 === creditedUser.length &&
        <div class="col-lg-3 pull-left">
          <button type="button" onClick={addCreditedTo} class="btn btn-primary btn-circular"> Add additional avatars </button>
        </div>
      }
      </div>)
    })}
      
    </div>

    <div class="col-lg-12 p0">
      <div class="col-lg-3 m-auto">
        {showButton === "false" || creditedUser.length !== 1 ? (
              <button type="button" onClick={checkValidation}  class="btn button btn-button btn-circular disabled"> Lock </button>
            ) : (
              <button type="button" onClick={handleSubmit} class="btn button btn-button btn-circular"> Lock </button>
            )}
      </div>
    </div>
  </div>
  );
}

Escrow.propTypes = {};

Escrow.defaultProps = {};

export default connect(mapStateToProps)(Escrow);
