import React, { useCallback } from "react";
import ethAddressConfig from "../../../abis/ethAddressConfig";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { depositABI } from "../../../abis/deposit";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useFormSubmitWithLoading } from "../../../hooks/useFormSubmitWithLoading";
import FormikInput from "../../../atoms/FormikInput";
import { Button } from "../../../atoms/Button/Button";
import { tokenBalance1ABI } from "../../../abis/XY_Token";

const ReStakeDepositFormValidationSchema = yup.object().shape({
  stakeRate: yup.string().required("Required*"),
});

const defaultValues = {
  stakeRate: "",
};

const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  account: state.account,
});

const ReStakeDepositForm = (props) => {
  const handleReStakeDepositForm = useCallback(
    async (stakeRate) => {
      const web3 = window.web3;
      if (web3 !== undefined && web3.eth !== undefined) {
        const unlockedMCTBalance = web3.utils.fromWei(
          props?.MCTBalance?.unlockedMCT.toString(),
          "Ether"
        );

        const result = (Number(unlockedMCTBalance) * Number(stakeRate)) / 100;

        const res = web3.utils.toWei(result.toString(), "Ether");

        const depositABIObject = new web3.eth.Contract(
          depositABI,
          ethAddressConfig.deposit_Address
        );
        const XYZTokenABIObject = new web3.eth.Contract(
          tokenBalance1ABI,
          ethAddressConfig.xy_token
        );
        try {
          await XYZTokenABIObject.methods
            .approve(ethAddressConfig.deposit_Address, res)
            .send({ from: props.account })
            .on("transactionHash", (hash) => {
              depositABIObject.methods
                .stakeMCT(res)
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
    },
    [props]
  );

  const onSubmit = useCallback(
    async (values, { resetForm }) => {
      await handleReStakeDepositForm(values?.stakeRate);
      resetForm();
      props.props.getAllBalance();
    },
    [handleReStakeDepositForm, props]
  );

  const { onSubmitHandler, loading } = useFormSubmitWithLoading(onSubmit);

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmitHandler}
      validationSchema={ReStakeDepositFormValidationSchema}
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
                    Re-Stake MCT
                  </small>
                </div>
              </div>

              <div className="col-lg-4 ">
                <div className="">Enter % share allocation</div>
                <FormikInput name="stakeRate" />
              </div>
              <div className="ml-2  d-flex align-items-end mt-2">
                <Button loading={loading}>Re-Stake</Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
ReStakeDepositForm.propTypes = {};

ReStakeDepositForm.defaultProps = {};

export default connect(mapStateToProps)(ReStakeDepositForm);
