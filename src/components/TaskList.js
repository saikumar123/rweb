import React, { useState } from "react";
import { Button } from "../atoms/Button/Button";

const TaskList = (props) => {
  const [selectedTransactionINdex, setSelectedTransactionIndex] = useState("");
  const handleUnlockAction = (index, lockStatus) => {
    setSelectedTransactionIndex(index);
    props.handleUnlock(index, lockStatus);
  };
  const [range, setRange] = useState(100);

  const rangeSlide = (e) => {
    setRange(e.target?.value);
  };
  return (
    <div class="row m-b-30 text-yellow">
      <div class="col-lg-12">
        <div className=" my-4 ">
          <small
            className="tag-line font-weight-bold"
            style={{ fontSize: "20px" }}
          >
            Task List
          </small>
        </div>
        {props.txnRows.length === 0 && (
          <small class="tag-line-error">{"No task item found"}</small>
        )}
      </div>

      {props.txnRows.map((row, index) => {
        return (
          <>
            {row.lockStatus === "UNLOCK" && (
              <div class="col-lg-12 p0 mt-3 pull-left d-flex align-items-center">
                <div class="col-lg-1 m-t-5 pull-left">Amount</div>
                <div class="col-lg-2 pull-left">
                  <input
                    type="text"
                    value={row.amount}
                    disabled="disabled"
                    readonly="readonly"
                    class="form-control disabled "
                    placeholder=""
                  />
                </div>

                <div class="col-lg-1.5 m-t-5 pull-left ml-5">Credited To</div>
                <div class="col-lg-2 pull-left">
                  <input
                    type="text"
                    value={row?.creditorAvatar}
                    disabled="disabled"
                    readonly="readonly"
                    class="form-control "
                    placeholder=""
                  />
                </div>

                <div class="col-lg-3 p-top10 pull-left ">
                  <div class="text-center w-100 pull-left mb-2">
                    <span class="text-yellow">Share {range} %</span>
                  </div>
                  <div>
                    <input
                      class="range"
                      type="range"
                      name=""
                      value={range}
                      min="0"
                      max="100"
                      onChange={rangeSlide}
                      onMouseMove={rangeSlide}
                    />
                    {/* <span id="rangeValue">{range}</span> */}
                  </div>
                </div>
                <div class="col-lg-2 p-top5 pull-left">
                  {row.lockStatus === "DONE" ? (
                    "Transaction completed"
                  ) : row.lockStatus === "UNLOCK" ? (
                    <Button
                      onClick={() => handleUnlockAction(index, "CLAIM")}
                      type="button"
                      loading={
                        props?.unLockLoader &&
                        index === selectedTransactionINdex
                      }
                      className="btn  button btn-button  btn-circular"
                    >
                      Unlock MCT
                    </Button>
                  ) : row.lockStatus === "CLAIM" ? (
                    "Transaction completed"
                  ) : (
                    /*   returnButton(row.timestamp, index) */
                    "Locked"
                  )}{" "}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

TaskList.propTypes = {};

TaskList.defaultProps = {};

export default TaskList;
