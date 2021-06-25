import React from "react";
import UpdateEscrowContract from "./components/UpdateEscrowContract";
import UpdateStakeContract from "./components/UpdateStakeContract";
import UpdateStakeGovContract from "./components/UpdateStakeGovContract";
import UpdateStakeLPContract from "./components/UpdateStakeLPContract";

const TokenomicsMethods = (props) => {
  return (
    <>
      <UpdateEscrowContract />
      <UpdateStakeContract />
      <UpdateStakeGovContract />
      <UpdateStakeLPContract />
    </>
  );
};

export default TokenomicsMethods;
