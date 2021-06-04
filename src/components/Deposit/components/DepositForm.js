import React, { useCallback } from "react";
import ethAddressConfig from "../../../abis/ethAddressConfig";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { depositABI } from "../../../abis/deposit";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useFormSubmitWithLoading } from "../../../hooks/useFormSubmitWithLoading";
import FormikInput from "../../../atoms/FormikInput";
import { Button } from "../../../atoms/Button/Button";
import { daiTokenABI } from "../../../abis/dai_token";

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
const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  account: state.account,
});

const DepositForm = (props) => {
  const [selectedVal, setSelectedVal] = React.useState({
    key: "USDT",
    text: "USDT",
    value: "USDT",
    image: { avatar: true, src: "/icon/usdt.png" },
  });

  const handleDepositForm = useCallback(async (amount, stakeRate) => {
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
      try {
        await daiTokenABIObject.methods
          .approve(ethAddressConfig.deposit_Address, lockValueBN)
          .send({ from: props.account })
          .on("transactionHash", (hash) => {
            depositABIObject.methods
              .depositAndStake(0, lockValueBN, stakeRate)
              .send({ from: props.account })
              .then((receipt) => {
                if (receipt.status) {
                  toast.success("Transaction Success");
                }
              })
              .catch((err) => {
                toast.error("Transaction Failed");
              });
          });
      } catch (err) {
        toast.error(err.message);
      }
    }
  }, []);

  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      await handleDepositForm(values?.amount, values?.stakeRate);
      resetForm();
      props.props.getAllBalance();
    },
    [handleDepositForm, props]
  );

  const { onSubmitHandler, loading } = useFormSubmitWithLoading(onSubmit);

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmitHandler}
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
                    defaultValue={"USDT"}
                    fluid
                    selection
                    options={options}
                    style={{ backgroundColor: "#fff !important" }}
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
