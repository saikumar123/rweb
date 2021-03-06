import React from "react";
import { Field, ErrorMessage } from "formik";

export const FormikInput = ({ name, ...props }) => {
  return (
    <div className="w-100">
      <Field
        type="number"
        className="form-control text-dark font-weight-bold form-control-active"
        name={name}
        {...props}
      />
      <div className="mt-2 position-absolute">
        <ErrorMessage
          name={name}
          component="div"
          style={{ color: "#FFEE28" }}
        />
      </div>
    </div>
  );
};
