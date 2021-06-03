import React from "react";

import DepositForm from "./components/DepositForm";
import ReStakeDepositForm from "./components/ReStakeDepositForm";

const Deposit = (props) => {
  return (
    <>
      <ReStakeDepositForm props={props} />
      <DepositForm props={props} />
    </>
  );
};

export default Deposit;
