import React, { useCallback, useEffect, useState, useRef } from "react";
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
import { faucetsABI } from "../../../abis/faucets_ABI";

const defaultValues = {
  amount: "",
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

const FaucetsForm = (props) => {
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
  });

  const handleFaucetsForm = useCallback(
    async (amount) => {
      const web3 = window.web3;
      if (web3 !== undefined && web3.eth !== undefined) {
        const lockValueBN = web3.utils.toWei(amount.toString(), "Ether");

        const faucetsABIObject = new web3.eth.Contract(
          faucetsABI,
          ethAddressConfig.FAUCETS_ADDRESS
        );

        try {
          setLoading(true);
          await faucetsABIObject.methods
            .mint(Number(unitSelectedVal), lockValueBN, props?.account)
            .send({ from: props.account })
            .then((receipt) => {
              if (receipt.status) {
                toast.success("Transaction Success");
                setLoading(false);
                getStableCoinBalances();
              }
            })
            .catch((err) => {
              setLoading(false);
              toast.error("Transaction Failed");
            });
        } catch (err) {
          setLoading(false);
          toast.error(err.message);
        }
      }
    },
    [unitSelectedVal]
  );

  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      await handleFaucetsForm(values?.amount);
      resetForm();
    },
    [handleFaucetsForm, props]
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
            <div
              className="row  text-white  "
              style={{ marginBottom: "100px" }}
            >
              <div className="col-lg-12 m-b-10">
                <div className=" my-4 ">
                  <small
                    className="tag-line font-weight-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Request Faucets
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
              <div className="col-lg-3 mx-auto">
                <div className="mt-3">
                  <Button loading={loading}>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
FaucetsForm.propTypes = {};

FaucetsForm.defaultProps = {};

export default connect(mapStateToProps)(FaucetsForm);
