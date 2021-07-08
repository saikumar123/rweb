import React from "react";
import AddPool from "./components/AddPool";

import UpdateStakeAddress from "./components/UpdateStakeAddress";

const DepositMethods = (props) => {
  return (
    <>
      <AddPool />
      <UpdateStakeAddress />
    </>
  );
};

export default DepositMethods;
