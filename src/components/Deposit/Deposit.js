import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import DepositForm from "./components/DepositForm";
import ReStakeDepositForm from "./components/ReStakeDepositForm";
import { toast } from "react-toastify";

const Deposit = (props) => {
  const [depositForm, showDepositForm] = useState(true);
  return (
    <div className="mt-4">
      <Button.Group size="large">
        <Button
          color={depositForm && "red"}
          content="Deposit"
          active
          onClick={() => showDepositForm(true)}
        ></Button>
        <Button.Or />
        <Button
          color={!depositForm && "red"}
          onClick={() => showDepositForm(false)}
        >
          Increase your weightage in pool
        </Button>
      </Button.Group>
      <div className="mt-3">
        {" "}
        {!depositForm ? (
          <ReStakeDepositForm props={props} />
        ) : (
          <DepositForm props={props} />
        )}
      </div>
    </div>
  );
};

export default Deposit;
