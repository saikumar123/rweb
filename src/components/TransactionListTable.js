import React, { useState, useEffect } from "react";
import Moment from "moment";
// import DataTable from 'react-data-table-component';
import DataTable, { createTheme } from "react-data-table-component";

createTheme("solarized", {
  text: {
    primary: "#fff",
    secondary: "#fff",
  },
  background: {
    default: "#000",
  },
  context: {
    background: "#000000",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

const TransactionListTable = (props) => {
  const [page, setPage] = useState(1);
  const [perPageRecord, setPerPageRecord] = useState(5);
  const [tableData, setTableData] = useState([]);

  // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' },
  //                 { id: 2, title: 'Conan the', year: '1983' },
  //                 { id: 3, title: 'Barbarian', year: '1984' },
  //                 { id: 4, title: 'Test 2', year: '1985' },
  //                 { id: 5, title: 'Conan the', year: '1983' },
  //                 { id: 6, title: 'Barbarian', year: '1984' },
  //                 { id: 7, title: 'Test 2', year: '1985' },
  //                 { id: 8, title: 'Conan the', year: '1983' },
  //                 { id: 9, title: 'Barbarian', year: '1984' },
  //                 { id: 10, title: 'Test 2', year: '1985' },
  //                 { id: 11, title: 'Conan the', year: '1983' },
  //                 { id: 12, title: 'Barbarian', year: '1984' },
  //                 { id: 13, title: 'Test 2', year: '1985' },];
  const columns = [
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
    },
    {
      name: "TimeStamp",
      selector: "timestamp",
      sortable: true,
      right: true,
    },
    {
      name: "Status",
      selector: "lockStatus",
      sortable: true,
      right: true,
    },
  ];
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

  useEffect(() => {
    let indexOfLastRecord = page * perPageRecord;
    let indexOfFirstRecord = indexOfLastRecord - perPageRecord;
    setTableData(props.txnRows.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [page, perPageRecord]);

  return (
    <div class="row m-b-30 blueTxt maindiv">
      <DataTable
        // title="Arnold Movies"
        theme={"solarized"}
        // theme="dark"
        columns={columns}
        pagination
        paginationServer
        data={tableData}
        paginationTotalRows={props.txnRows.length}
        paginationPerPage={perPageRecord}
        paginationComponentOptions={{
          noRowsPerPage: false,
        }}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50]}
        onChangeRowsPerPage={(perpage) => setPerPageRecord(perpage)}
        onChangePage={(page) => setPage(page)}
      />

      {/* <div class="col-lg-12 m-b-15\">
        <small class="tag-line">
          {" "}
          <i>Transaction List</i>
        </small>
        {props.txnRows.length === 0 &&
          <small class="tag-line-error">
            {"No transaction item found"}
          </small>
        }
      </div>
      <div class="col-lg-12 p0 pull-left smlTxt">
        <div class="col-lg-3 m-t-5 pull-left">
          Transactions (Amount)
        </div>
        <div class="col-lg-4 pull-left">
          Timestamp (mm/dd/yyyy) UTC
        </div>
        <div class="col-lg-3 m-t-5 pull-left">
          Type
        </div>
      </div>

      {props.txnRows.sort((a, b) => new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1).map(
        (row, index) => {
          return (

            <>
              <div class="col-lg-12 p0 pull-left" className={row.lockStatus === "DONE" || row.lockStatus === "CLAIM" ? 'col-lg-12 p0 pull-left completed' : row.lockStatus === "UNLOCK" ? 'col-lg-12 p0 pull-left unlocked' : 'col-lg-12 p0 pull-left locked'}>
                <div class="col-lg-3 m-t-5 pull-left">
                   {row.amount}
                </div>
                <div class="col-lg-4 pull-left">
                  {convertDateTime(row.timestamp)}
                </div>

                <div class="col-lg-3 m-t-5 pull-left">

                  {row.lockStatus === "DONE" ? (
                    "completed"
                  ) : row.lockStatus === "UNLOCK" ? (

                    "Unlocked"

                  ) : row.lockStatus === "CLAIM" ? (
                    "completed"

                  ) : (
                          "Locked"
                        )}{" "}


                </div>

              </div>

            </>
          )
        }
      )} */}
    </div>
  );
};

TransactionListTable.propTypes = {};

TransactionListTable.defaultProps = {};

export default TransactionListTable;
