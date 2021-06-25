import React, { useState } from "react";
import { Button } from "semantic-ui-react";

import WhiteListForm from "./components/WhiteListForm";
import RemoveWhiteListForm from "./components/RemoveWhiteListForm";

const WhiteList = (props) => {
  const [addWhiteListForm, showAddWhiteListForm] = useState(true);
  return (
    <div className="mt-5">
      <Button.Group size="large">
        <Button
          color={addWhiteListForm && "red"}
          content="Add WhiteList"
          active
          onClick={() => showAddWhiteListForm(true)}
        ></Button>
        <Button.Or />
        <Button
          color={!addWhiteListForm && "red"}
          onClick={() => showAddWhiteListForm(false)}
        >
          Remove WhiteList
        </Button>
      </Button.Group>
      <div className="mt-5">
        {" "}
        {addWhiteListForm ? (
          <WhiteListForm props={props} />
        ) : (
          <RemoveWhiteListForm props={props} />
        )}
      </div>
    </div>
  );
};

export default WhiteList;
