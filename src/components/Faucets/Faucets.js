import React from "react";

import FaucetsForm from "./components/FaucetsForm";

const Faucets = (props) => {
  return (
    <div className="mt-5">
      <div className="mt-5">
        <FaucetsForm props={props} />
      </div>
    </div>
  );
};

export default Faucets;
