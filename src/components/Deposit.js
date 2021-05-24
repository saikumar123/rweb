import React, { useCallback } from "react";
import ethAddressConfig from "../abis/ethAddressConfig";
import { Form, Formik, Field } from "formik";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { depositABI } from "../abis/deposit";
import * as yup from "yup";
import { useFormSubmitWithLoading } from "../hooks/useFormSubmitWithLoading";
import FormikInput from "../atoms/FormikInput";
import { Button } from "../atoms/Button/Button";
import { nithinTokenABI } from "../abis/nithin_Token";

// var bigInt = require("big-integer");

const DepositValidationSchema = yup.object().shape({
  amount: yup.string().required("Required*"),
  stakeRate: yup.string().required("Required*"),
});

const defaultValues = {
  amount: "",
  stakeRate: "",
};

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
  const [selectedVal, setSelectedVal] = React.useState({
    key: "USDT",
    text: "USDT",
    value: "USDT",
    image: { avatar: true, src: "/icon/usdt.png" },
  });

  const convertNumber = 1000000000;
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleDeposit = async (amount, stakeRate) => {
    setSuccessMessage("");
    setErrorMessage("");
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
      // const lockValueBN = bigInt(parseFloat(amount) * convertNumber)?.value;
      const lockValueBN = web3.utils.toWei(amount.toString(), "Ether");

      const depositABIObject = new web3.eth.Contract(
        depositABI,
        ethAddressConfig.deposit_Address
      );
      const nithinTokenABIObject = new web3.eth.Contract(
        nithinTokenABI,
        ethAddressConfig.nithin_token
      );
      console.log(lockValueBN);
      await nithinTokenABIObject.methods
        .approve(ethAddressConfig.deposit_Address, lockValueBN)
        .send({ from: props.account })
        .on("transactionHash", (hash) => {
          depositABIObject.methods
            .depositAndStake(0, lockValueBN, stakeRate)
            .send({ from: props.account })
            .on("transactionHash", (hash) => {});
        });
    }
  };

  const onSubmit = useCallback(async (values) => {
    handleDeposit(values?.amount, values?.stakeRate);
  }, []);

  const { onSubmitHandler, loading } = useFormSubmitWithLoading(onSubmit);

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmitHandler}
      validationSchema={DepositValidationSchema}
    >
      {({ errors }) => (
        <Form>
          {console.log(errors)}
          <div className="d-flex flex-column ">
            <div className="row m-b-30 blueTxt ">
              <div className="col-lg-12 m-b-10">
                <small className="tag-line">
                  <i>Deposits</i>
                </small>
                {successMessage && (
                  <small className="tag-line-success">{successMessage}</small>
                )}
                {errorMessage && (
                  <small className="tag-line-error">{errorMessage}</small>
                )}
              </div>

              <div className="col-lg-1.5 p-l-15 m-t-28">Enter Amount</div>
              <div className="col-lg-3  m-t-23">
                <FormikInput name="amount" />
              </div>

              <div className="col-lg-2">
                <div className="mb-2 blueTxt">Select Unit</div>
                <div className="border border-white ">
                  <Dropdown
                    placeholder="Select Unit"
                    defaultValue={"USDT"}
                    fluid
                    selection
                    options={options}
                    style={{ border: "1px sold red" }}
                  />
                </div>
              </div>
              <div className="col-lg-2.5 m-t-28 m-l-10">
                Enter % share allocation
              </div>
              <div className="col-lg-3 m-t-23">
                <FormikInput name="stakeRate" />
              </div>
            </div>
            <Button>Deposit</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
Deposit.propTypes = {};

Deposit.defaultProps = {};

export default connect(mapStateToProps)(Deposit);
