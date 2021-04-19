import React from "react";

const TaskList = (props) => {

  return (
    <div class="row m-b-30 blueTxt">
      <div class="col-lg-12 m-b-30">
        <small class="tag-line">
          {" "}
          <i>Task List</i>
        </small>
        {props.txnRows.length === 0 &&
          <small class="tag-line-error">
            {"No task item found"}
          </small>
        }
        {props.taskUnlock !== '' &&
          <small class="tag-line-success">
            {props.taskUnlock}
          </small>
        }
      </div>
      <div class="col-lg-12 pull-left">
        <div class="col-lg-7 pull-left">

        </div>
        <div class="col-lg-1.5 pull-left">
          <span id="rangeValue" class="rangeColor">Share %</span>
        </div>
      </div>

      {props.txnRows.map(
        (row, index) => {
          return (

            <>
              {row.lockStatus === "UNLOCK" &&
                <div class="col-lg-12 p0 pull-left">
                  <div class="col-lg-1 m-t-5 pull-left">
                    Amount
            </div>
                  <div class="col-lg-2 pull-left">
                    <input type="text" value={row.amount} disabled="disabled" readonly="readonly" class="form-control disabled fulldisabled" placeholder="" />
                  </div>

                  <div class="col-lg-1.5 m-t-5 pull-left">
                    Credited To
            </div>
                  <div class="col-lg-2 pull-left">
                    <input type="text" value={row.recipientAvatar} disabled="disabled" readonly="readonly" class="form-control fulldisabled" placeholder="" />
                  </div>

                  <div class="col-lg-3 p-top10 pull-left">
                    <div>

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
                      <span id="rangeValue">0</span>
                    </div>
                  </div>
                  <div class="col-lg-2 p-top5 pull-left">
                    {row.lockStatus === "DONE" ? (
                      "Transaction completed"
                    ) : row.lockStatus === "UNLOCK" ? (
                      <button onClick={() => props.handleUnlock(index, "CLAIM")} type="button" class="btn button btn-button btn-circular">
                        Unlock MCT
                      </button>
                    ) : row.lockStatus === "CLAIM" ? (
                      "Transaction completed"
                      /*   returnButton(row.timestamp, index) */
                    ) : (
                            "Locked"
                          )}{" "}

                  </div>
                </div>
              }
            </>
          )
        }

      )}
    </div>
  );

}

TaskList.propTypes = {};

TaskList.defaultProps = {};

export default TaskList;
