import React, { useCallback, useEffect, useState, useRef } from "react";
import ethAddressConfig from "../../../abis/ethAddressConfig";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { depositABI } from "../../../abis/deposit";
import { toast } from "react-toastify";
import { set_Transaction_Loader } from "../../../redux/action";
import * as yup from "yup";
import FormikInput from "../../../atoms/FormikInput";
import { Button } from "../../../atoms/Button/Button";
import { daiTokenABI } from "../../../abis/dai_token";
import { USDTABI } from "../../../abis/USDTABI";
import { USDCABI } from "../../../abis/USDCABI";

const mapDispatchToProps = (data) => {
  return {
    set_Transaction_Loader: (data) => {
      set_Transaction_Loader(data);
    },
  };
};

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
  const [stableCoinBalance, setStableCoinBalance] = useState({});
  const [selectedCoinBalance, setSelectedCoinBalance] = useState(0);

  const [loading, setLoading] = React.useState(false);

  const DepositFormValidationSchema = yup.object().shape({
    amount: yup
      .string()
      .test(function (value) {
        if (Number(value) > Number(selectedCoinBalance)) {
          return this.createError({ message: "Insufficient Balance" });
        } else return true;
      })
      .required("Required*"),
    stakeRate: yup.string().required("Required*"),
  });

  const depositHandler = useCallback(
    async (ABIObject, lockValueBN, stakeRate, depositABIObject) => {
      try {
        setLoading(true);
        await ABIObject.methods
          .approve(ethAddressConfig?.deposit_Address, lockValueBN)
          .send({ from: props.account })
          .on("transactionHash", (hash) => {
            props.set_Transaction_Loader(true);
          })
          .on("receipt", (receipt) => {
            if (receipt.status) {
              props.set_Transaction_Loader(false);
              depositABIObject.methods
                .depositAndStake(
                  Number(unitSelectedVal),
                  lockValueBN,
                  stakeRate
                )
                .send({ from: props.account })
                .on("transactionHash", (hash) => {
                  props.set_Transaction_Loader(true);
                })
                .then((receipt) => {
                  if (receipt.status) {
                    props.set_Transaction_Loader(false);

                    toast.success("Transaction Success");
                    setLoading(false);
                    props.props.getAllBalance();
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  props.set_Transaction_Loader(false);
                  toast.error("Transaction Failed");
                });
            }
          });
      } catch (err) {
        setLoading(false);
        props.set_Transaction_Loader(false);
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

  const getStableCoinBalances = async () => {
    const web3 = window.web3;
    if (web3 !== undefined && web3.eth !== undefined) {
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

      const DAIBalance = await daiTokenABIObject.methods
        .balanceOf(props.account)
        .call();
      const USDTBalance = await USDTABIObject.methods
        .balanceOf(props.account)
        .call();
      const USDCBalance = await USDCABIObject.methods
        .balanceOf(props.account)
        .call();

      setStableCoinBalance({
        DAIBalance: web3.utils.fromWei(DAIBalance.toString(), "Ether"),
        USDTBalance: web3.utils.fromWei(USDTBalance.toString(), "Ether"),
        USDCBalance: web3.utils.fromWei(USDCBalance.toString(), "Ether"),
      });
    }
  };

  useEffect(() => {
    getStableCoinBalances();
  }, []);

  useEffect(() => {
    formref?.current?.setFieldValue("amount", 0);

    if (unitSelectedVal === "0") {
      setSelectedCoinBalance(stableCoinBalance?.DAIBalance);
    } else if (unitSelectedVal === "1") {
      setSelectedCoinBalance(stableCoinBalance?.USDTBalance);
    } else {
      setSelectedCoinBalance(stableCoinBalance?.USDCBalance);
    }
  }, [stableCoinBalance, unitSelectedVal]);

  const handleUnitDropdown = (e, data) => {
    setUnitSelectedVal(data?.value);
  };

  const formref = useRef();

  const handleDepositMaxAmount = () => {
    formref?.current?.setFieldValue("amount", selectedCoinBalance);
  };

  useEffect(() => {
    if (
      Number(formref?.current?.values?.amount) > Number(selectedCoinBalance)
    ) {
      formref?.current?.setErrors({ amount: "Insufficient Balance" });
    }
  }, [formref, selectedCoinBalance]);

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={DepositFormValidationSchema}
      innerRef={formref}
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
                    Deposit
                  </small>
                </div>
              </div>

              <div className="col-lg-4 ">
                <div className="d-flex justify-content-between">
                  <div className="">
                    <span className="text-yellow"> Available Bal:</span>{" "}
                    {selectedCoinBalance}
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FormikInput name="amount" />
                  <button
                    style={{
                      position: "absolute",
                      right: "20px",
                      marginTop: "3px",
                      padding: "5px",
                      color: "#000",
                      borderRadius: "5px",
                    }}
                    onClick={handleDepositMaxAmount}
                  >
                    Max
                  </button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DepositForm);
