import React from "react";
import { Button } from "../../../atoms/Button/Button";

const Toknomics = (props) => {
  return (
    <div className="mt-5">
      <div className="row m-b-30 text-white  ">
        <div className="col-lg-12 m-b-10">
          <div className=" my-4 ">
            <small
              className="tag-line font-weight-bold"
              style={{ fontSize: "20px" }}
            >
              Tokonomics
            </small>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Button>Release DFL</Button>
        <Button>Release FEES</Button>
      </div>
    </div>
  );
};

export default Toknomics;
