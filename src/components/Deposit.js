import React from "react";
import ethAddressConfig from "../abis/ethAddressConfig";
import { stakeABI } from "../abis/Stake";
import { lpABI } from "../abis/Liquidity_Pool";
import { connect } from "react-redux";
import usdc from "../assets/icon/usd-coin-usdc.png";
import { Dropdown } from "semantic-ui-react";
import { depositABI } from "../abis/deposit";

var bigInt = require("big-integer");

const options = [
  {
    key: "USDT",
    text: "USDT",
    value: "USDT",
    image: { avatar: true, src: "/icon/usdt-logo-2.png" },
  },
  {
    key: "USDC",
    text: "USDC",
    value: "USDC",
    image: { avatar: true, src: "/icon/usd-coin-usdc.png" },
  },
  {
    key: "DAI",
    text: "DAI",
    value: "DAI",
    image: { avatar: true, src: "/icon/dai-logo.png" },
  },
];
// const options =["Eth", "DAI"];
const mapStateToProps = (state) => ({
  balance1: state.balance1,
  account: state.account,
});

const Deposit = (props) => {
  const [value, setValue] = React.useState("");
  const [textValue, setTextValue] = React.useState("");
  const [selectedVal, setSelectedVal] = React.useState({
    key: "USDT",
    text: "USDT",
    value: "USDT",
    image: { avatar: true, src: "/icon/usdt.png" },
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  // const [resultTextValue, setResultTextValue] = React.useState("");
  // const handleDeposit = async () => {
  //   setSuccessMessage("");
  //   setErrorMessage("");
  //   const web3 = window.web3;
  //   if (web3 !== undefined && web3.eth !== undefined) {
  //     const lockValueBN = bigInt(parseFloat(textValue) * 1000000000000000000);
  //     const depositABIObject = new web3.eth.Contract(
  //       depositABI,
  //       ethAddressConfig.deposit_address
  //     );
  //     console.log(depositABIObject);

  //     const stakeABIObject = new web3.eth.Contract(
  //       stakeABI,
  //       ethAddressConfig.stake_address
  //     );

  //     // await lpABIObject.methods
  //     //   .approve(ethAddressConfig.stake_address, lockValueBN.value)
  //     //   .send({ from: props.account })
  //     //   .on("transactionHash", (hash) => {
  //     //     stakeABIObject.methods
  //     //       .deposit("0", lockValueBN.value)
  //     //       .send({ from: props.account })
  //     //       .on("transactionHash", (hash) => {});
  //     //   });

  //     // stakeABIObject.events
  //     //   .Deposit({ fromBlock: "0" })
  //     //   .on("data", (event) => {});
  //     const depositEvent = stakeABIObject.events
  //       .Deposit({ fromBlock: "0" })
  //       .on("data", (event) => {
  //         if (event.transactionHash) {
  //           props.getBalance1();
  //           setTextValue("");
  //           setSuccessMessage("Transaction completed successfully.");
  //           setErrorMessage("");
  //         } else {
  //           setSuccessMessage("");
  //           setErrorMessage("Some error occurs. Please check the transaction");
  //         }
  //       });
  //   }
  // };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeposit = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      const depositABIObject = new web3.eth.Contract(
        depositABI,
        ethAddressConfig.deposit_address
      );

      const lockValueBN = bigInt(parseFloat(textValue) * 100000);
      console.log(lockValueBN?.value);
      await depositABIObject.methods
        .depositAndStake(0, lockValueBN?.value, value)
        .send({ from: props.account })
        .on("transactionHash", (hash) => {
          console.log(hash);
        });
    }
  };

  const handleChange = (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    setTextValue(e.target.value);
  };
  return (
    <div className="row m-b-30 blueTxt">
      <div className="col-lg-12 m-b-10">
        {" "}
        <small className="tag-line">
          {" "}
          <i>Deposits</i>
        </small>{" "}
        {successMessage && (
          <small className="tag-line-success">{successMessage}</small>
        )}
        {errorMessage && (
          <small className="tag-line-error">{errorMessage}</small>
        )}
      </div>

      <div className="col-lg-1.5 p-l-15 m-t-28">Enter Amount</div>
      <div className="col-lg-3  m-t-23">
        <input
          type="number"
          onChange={handleChange}
          value={textValue}
          className="form-control form-control-active"
          placeholder=""
        />
      </div>

      {/* <div className="col-lg-1 "></div> */}
      <div className="col-lg-2">
        <span className="smlTxt">Select Unit</span>
        <Dropdown
          placeholder="Select Unit"
          defaultValue={"USDT"}
          fluid
          selection
          options={options}
        />
        {/* <select
          className="custom-select"
          id="newlocale"
          value={value}
          onChange={onChange}
        > */}
        {/* {options.map((option) => {
            return (
              <option value={option} key={option}>
                 <div><img src={usdc} height="30px" width="30px"/>{option} </div>
              </option> 
            );
          })} */}
        {/* <option value="1"><img
              src="../assets/images/football.png"
              alt=""
              width="25"
              height="25"
            /></option>
        <option value="2">Ethereum</option>
        <option value="3">Repple</option> */}
        {/* </select> */}
        <br />
        <br />

        <button
          type="button"
          onClick={handleDeposit}
          className="btn button btn-button btn-circular m-t-10"
        >
          Deposit
        </button>
      </div>
      {/* <div className="col-lg-1"></div> */}
      <div className="col-lg-2.5 m-t-28 m-l-10">
        Enter % share allocation
        {/* <br /> */}
      </div>
      <div className="col-lg-3 m-t-23">
        <input
          type="number"
          className="form-control form-control-active"
          placeholder=""
          onChange={onChange}
        />
        <span className="smlTxt">This field cannot be left blank.</span>
      </div>
    </div>
  );
};
Deposit.propTypes = {};

Deposit.defaultProps = {};

export default connect(mapStateToProps)(Deposit);
