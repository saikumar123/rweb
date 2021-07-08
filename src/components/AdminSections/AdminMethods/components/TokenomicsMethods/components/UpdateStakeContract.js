import React, { useCallback } from "react";
import { Form, Formik } from "formik";
import { connect } from "react-redux";

import * as yup from "yup";
import { useFormSubmitWithLoading } from "../../../../../../hooks/useFormSubmitWithLoading";
import FormikInput from "../../../../../../atoms/FormikInput";
import { Button } from "../../../../../../atoms/Button";

const validationSchema = yup.object().shape({
  stakeRate: yup.string().required("Required*"),
});

const defaultValues = {
  stakeRate: "",
};

const mapStateToProps = (state) => ({
  MCTBalance: state.MCTBalance,
  account: state.account,
});

const UpdateStakeContract = (props) => {
  const onSubmit = useCallback(async (values, { resetForm }) => {
    resetForm();
  }, []);

  const { onSubmitHandler, loading } = useFormSubmitWithLoading(onSubmit);

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmitHandler}
      validationSchema={validationSchema}
    >
      {({ errors }) => (
        <Form>
          <div className="d-flex flex-column ">
            <div className="row m-b-30 text-white  ">
              <div className="col-lg-12 m-b-10">
                <div className=" my-2 ">
                  <small
                    className="tag-line font-weight-bold"
                    style={{ fontSize: "18px" }}
                  >
                    Update Stake Contract Address
                  </small>
                </div>
              </div>

              <div className="col-lg-4 ">
                <div className="">Enter Address</div>
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
UpdateStakeContract.propTypes = {};

UpdateStakeContract.defaultProps = {};

export default connect(mapStateToProps)(UpdateStakeContract);
