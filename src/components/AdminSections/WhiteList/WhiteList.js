import React, { useState } from "react";
import { Button } from "semantic-ui-react";

import WhiteListForm from "./components/WhiteListForm";

const WhiteList = (props) => {
  const [depositForm, showDepositForm] = useState(true);
  return (
    <div className="mt-5">
      {/* <Button.Group size="large">
        <Button
          color={depositForm && "red"}
          content="Add WhiteList"
          active
          onClick={() => showDepositForm(true)}
        ></Button>
        <Button.Or />
        <Button
          color={!depositForm && "red"}
          onClick={() => showDepositForm(false)}
        >
          Remove WhiteList
        </Button>
      </Button.Group> */}
      <div className="mt-5">
        {" "}
        {!depositForm ? (
          <WhiteListForm props={props} />
        ) : (
          <WhiteListForm props={props} />
        )}
      </div>
    </div>
  );
};

export default WhiteList;
