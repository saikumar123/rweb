import React from "react";
const TaskList = (props) => {
  return (
    <div class="row m-b-30 blueTxt">
      <div class="col-lg-12 m-b-30">
        <small class="tag-line">
          {" "}
          <i>Task List</i>
        </small>
      </div>
      {props.txnRows.map((row, index) => {
        return (
          <>
            {row.lockStatus === "UNLOCK" && (
              <>
                <div class="col-lg-3">
                  Amount
                  <br />
                  <input
                    type="text"
                    value={row.amount}
                    readonly="readonly"
                    class="form-control disabled"
                    placeholder=""
                  />
                </div>

                <div class="col-lg-3">
                  Credited To
                  <br />
                  <input
                    type="text"
                    value={row.recipientAvatar}
                    readonly="readonly"
                    class="form-control"
                    placeholder=""
                  />
                </div>

                <div class="col-lg-3 p-top10">
                  <div>
                    <span id="rangeValue ">Share %</span>
                    <span id="rangeValue">0</span>
                    <input
                      class="range"
                      type="range"
                      name=""
                      value="0"
                      min="0"
                      max="100"
                      // onChange="rangeSlide(this.value)"
                      // onmousemove="rangeSlide(this.value)"
                    />
                  </div>
                </div>
                <div class="col-lg-3 p-top20">
                  {row.lockStatus === "DONE" ? (
                    "Transaction completed"
                  ) : row.lockStatus === "UNLOCK" ? (
                    <button
                      onClick={() => props.handleUnlock(index, "CLAIM")}
                      type="button"
                      class="btn button btn-button btn-circular"
                    >
                      Unlock MCT
                    </button>
                  ) : row.lockStatus === "CLAIM" ? (
                    "Transaction completed"
                  ) : (
                    /*   returnButton(row.timestamp, index) */
                    "Locked"
                  )}{" "}
                </div>
              </>
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
