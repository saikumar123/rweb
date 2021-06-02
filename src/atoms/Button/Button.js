import React from "react";
import { Loader } from "semantic-ui-react";

export const Button = ({ loading, title, children, ...props }) => {
  return (
    <button
      className="btn button position-relative mt-2 h-auto btn-button align-self-center btn-circular p-3 cursor-pointer"
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Loader active size="small" inverted inline="centered" />
      ) : (
        children
      )}
    </button>
  );
};
