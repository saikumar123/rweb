import { useFormSubmitWithLoading } from "../../hooks/useFormSubmitWithLoading";
import { Form, Formik, Field } from "formik";
import React, { FC } from "react";

import * as yup from "yup";

const DepositValidationSchema = yup.object().shape({
  username: yup.string().required("form.error.required"),
  password: yup.string().required("form.error.required"),
});

const defaultValues = {
  username: "",
  password: "",
  isRemember: false,
};

export const DepositForm = ({ onSubmit }) => {
  const { onSubmitHandler, loading } = useFormSubmitWithLoading(onSubmit);

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize={true}
      onSubmit={onSubmitHandler}
      validationSchema={DepositValidationSchema}
    >
      {() => (
        <Form>
          <div className="row m-b-30 blueTxt">
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
              <input
                type="number"
                onChange={handleChange}
                value={textValue}
                className="form-control form-control-active"
                placeholder=""
              />
            </div>

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
        </Form>
      )}
    </Formik>
  );
};
