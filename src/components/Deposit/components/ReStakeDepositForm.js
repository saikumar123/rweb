import React, { useCallback } from "react";
import ethAddressConfig from "../../../abis/ethAddressConfig";
import { Form, Formik } from "formik";
import { set_Transaction_Loader } from "../../../redux/action";

import { connect } from "react-redux";
import { depositABI } from "../../../abis/deposit";
import { toast } from "react-toastify";

import * as yup from "yup";
import FormikInput from "../../../atoms/FormikInput";
import { Button } from "../../../atoms/Button/Button";
import { tokenBalance1ABI } from "../../../abis/XY_Token";

const ReStakeDepositFormValidationSchema = yup.object().shape({
  stakeRate: yup.string().required("Required*"),
});
const mapDispatchToProps = (data) => {
  return {
    set_Transaction_Loader: (data) => {
      set_Transaction_Loader(data);
    },
  };
};

const defaultValues = {
  stakeRate: "",
};

const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  account: state.account,
});

const ReStakeDepositForm = (props) => {
  const [loading, setLoading] = React.useState(false);
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
          setLoading(true);

          await XYZTokenABIObject.methods
            .approve(ethAddressConfig.deposit_Address, res)
            .send({ from: props.account })
            .on("transactionHash", (hash) => {
              props.set_Transaction_Loader(true);
            })
            .on("receipt", (receipt) => {
              if (receipt.status) {
                props.set_Transaction_Loader(false);

                depositABIObject.methods
                  .stakeMCT(res)
                  .send({ from: props.account })
                  .on("transactionHash", (hash) => {
                    props.set_Transaction_Loader(true);
                  })
                  .then((receipt) => {
                    if (receipt.status) {
                      props.set_Transaction_Loader(false);
                      setLoading(false);
                      toast.success("Transaction Success");
                      props.props.getAllBalance();
                    }
                  })
                  .catch((err) => {
                    props.set_Transaction_Loader(false);
                    setLoading(false);
                    toast.error("Transaction Failed");
                  });
              }
            });
        } catch (err) {
          props.set_Transaction_Loader(false);
          setLoading(false);
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

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
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
                    Increase your weightage in pool.
                  </small>
                </div>
              </div>

              <div className="col-lg-4 ">
                <div className="">Enter % share allocation</div>
                <FormikInput name="stakeRate" />
              </div>
              <div className="ml-2  d-flex align-items-end mt-2">
                <Button loading={loading}>Submit</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReStakeDepositForm);
