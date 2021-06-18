import React, { useCallback } from "react";
import ethAddressConfig from "../../../abis/ethAddressConfig";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { depositABI } from "../../../abis/deposit";
import { toast } from "react-toastify";

import * as yup from "yup";
import FormikInput from "../../../atoms/FormikInput";
import { Button } from "../../../atoms/Button/Button";
import { daiTokenABI } from "../../../abis/dai_token";
import { USDTABI } from "../../../abis/USDTABI";
import { USDCABI } from "../../../abis/USDCABI";

const DepositFormValidationSchema = yup.object().shape({
  amount: yup.string().required("Required*"),
  stakeRate: yup.string().required("Required*"),
});

const defaultValues = {
  amount: "",
  stakeRate: "",
};

const options = [
  {
    key: "DAI",
    text: "DAI",
    value: "0",
    image: { avatar: true, src: "/icon/dai-logo.png" },
  },
  {
    key: "USDT",
    text: "USDT",
    value: "1",
    image: { avatar: true, src: "/icon/usdt-logo-2.png" },
  },
  {
    key: "USDC",
    text: "USDC",
    value: "2",
    image: { avatar: true, src: "/icon/usd-coin-usdc.png" },
  },
];
const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  account: state.account,
});

const DepositForm = (props) => {
  const [unitSelectedVal, setUnitSelectedVal] = React.useState("0");
  const [loading, setLoading] = React.useState(false);
  const depositHandler = useCallback(
    async (ABIObject, lockValueBN, stakeRate, depositABIObject) => {
      try {
        setLoading(true);
        await ABIObject.methods
          .approve(ethAddressConfig?.deposit_Address, lockValueBN)
          .send({ from: props.account })
          .on("transactionHash", (hash) => {
            depositABIObject.methods
              .depositAndStake(Number(unitSelectedVal), lockValueBN, stakeRate)
              .send({ from: props.account })
              .then((receipt) => {
                if (receipt.status) {
                  toast.success("Transaction Success");
                  setLoading(false);
                  props.props.getAllBalance();
                }
              })
              .catch((err) => {
                setLoading(false);
                toast.error("Transaction Failed");
              });
          });
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    },
    [props, unitSelectedVal]
  );

  const handleDepositForm = useCallback(
    async (amount, stakeRate) => {
      const web3 = window.web3;
      if (web3 !== undefined && web3.eth !== undefined) {
        const lockValueBN = web3.utils.toWei(amount.toString(), "Ether");

        const depositABIObject = new web3.eth.Contract(
          depositABI,
          ethAddressConfig.deposit_Address
        );
        const daiTokenABIObject = new web3.eth.Contract(
          daiTokenABI,
          ethAddressConfig.dai_token
        );
        const USDTABIObject = new web3.eth.Contract(
          USDTABI,
          ethAddressConfig.USDT_Address
        );
        const USDCABIObject = new web3.eth.Contract(
          USDCABI,
          ethAddressConfig.USDC_Address
        );

        if (unitSelectedVal === "0") {
          await depositHandler(
            daiTokenABIObject,
            lockValueBN,
            stakeRate,
            depositABIObject
          );
        } else if (unitSelectedVal === "1") {
          await depositHandler(
            USDTABIObject,
            lockValueBN,
            stakeRate,
            depositABIObject
          );
        } else {
          await depositHandler(
            USDCABIObject,
            lockValueBN,
            stakeRate,
            depositABIObject
          );
        }
      }
    },
    [depositHandler, unitSelectedVal]
  );

  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      await handleDepositForm(values?.amount, values?.stakeRate);
      resetForm();
    },
    [handleDepositForm, props]
  );

  const handleUnitDropdown = (e, data) => {
    setUnitSelectedVal(data?.value);
  };

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={DepositFormValidationSchema}
    >
      {({ errors }) => (
        <Form>
          <div className="d-flex flex-column ">
            <div className="row m-b-30 text-white  ">
              <div className="col-lg-12 m-b-10">
                <div className=" my-4 ">
                  <small
                    className="tag-line font-weight-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Deposits
                  </small>
                </div>
              </div>

              <div className="col-lg-4 ">
                <div className="">Enter Amount</div>
                <FormikInput name="amount" />
              </div>

              <div className="col-lg-3 mx-auto">
                <div className="mb-2">Select Unit</div>
                <div className="border border-white ">
                  <Dropdown
                    placeholder="Select Unit"
                    defaultValue={"0"}
                    fluid
                    selection
                    options={options}
                    style={{ backgroundColor: "#fff !important" }}
                    onChange={handleUnitDropdown}
                  />
                </div>
              </div>

              <div className="col-lg-4 ">
                <div className="">Enter % share allocation</div>
                <FormikInput name="stakeRate" />
              </div>
            </div>
            <div className="mt-5 text-center">
              <Button loading={loading}>Deposit</Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
DepositForm.propTypes = {};

DepositForm.defaultProps = {};

export default connect(mapStateToProps)(DepositForm);
