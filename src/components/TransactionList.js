import React from "react";
import Moment from "moment";

const TransactionList = (props) => {
  const convertDateTime = (date) => {
    let newdate = new Date(date);
    var seconds = Math.floor((new Date() - newdate) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) {
      return Moment(date).format("MM/DD/YYYY - hh:mm:ss");
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };
  return (
    <div class="row m-b-30 blueTxt">
      <div class="col-lg-12 m-b-15\">
        <div className=" my-4 ">
          <small
            className="tag-line font-weight-bold"
            style={{ fontSize: "20px" }}
          >
            Transaction List
          </small>
        </div>
        {props.txnRows.length === 0 && (
          <small class="tag-line-error">{"No transaction item found"}</small>
        )}
      </div>
      <div class="col-lg-12 col-sm-12 p0 pull-left smlTxt">
        <div class="col-lg-4 col-sm-3 m-t-5 pull-left">
          Transactions (Amount)
        </div>
        <div class="col-lg-4 col-sm-4 m-t-5  pull-left">
          Timestamp (mm/dd/yyyy) UTC
        </div>
        <div class="col-lg-4  col-sm-3 m-t-5 pull-left">Type</div>
      </div>

      {props.txnRows
        .sort((a, b) =>
          new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1
        )
        .map((row, index) => {
          return (
            <>
              <div
                class="col-lg-12 mt-2 col-sm-12 p0 pull-left"
                className={
                  row.lockStatus === "DONE" || row.lockStatus === "CLAIM"
                    ? "col-lg-12 p0 pull-left completed"
                    : row.lockStatus === "UNLOCK"
                    ? "col-lg-12 p0 pull-left unlocked"
                    : "col-lg-12 p0 pull-left locked"
                }
              >
                <div class="col-lg-4 col-sm-3 m-t-5 pull-left">
                  {row.amount}
                </div>
                <div class="col-lg-4 col-sm-4 pull-left">
                  {convertDateTime(row.timestamp)}
                </div>

                <div class="col-lg-4 col-sm-3 m-t-5 pull-left">
                  {row.lockStatus === "DONE"
                    ? "completed"
                    : row.lockStatus === "UNLOCK"
                    ? "Unlocked"
                    : row.lockStatus === "CLAIM"
                    ? "completed"
                    : "Locked"}{" "}
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

TransactionList.propTypes = {};

TransactionList.defaultProps = {};

export default TransactionList;
