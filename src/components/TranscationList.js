import React from "react";
// import PropTypes from "prop-types";
import Moment from 'moment';

const TranscationList = (props) => {
  const convertDateTime = (date) => {
    // let year = new Date().getFullYear();
    let newdate = new Date(date);
    let difference = +new Date() - +new Date(date);
    let timeLeft = {};

    
    var seconds = Math.floor((new Date() - newdate) / 1000);
    console.log(seconds)
  // var interval = seconds / 31536000;

  // if (interval > 1) {
  //   return Math.floor(interval) + " years";
  // }
  // interval = seconds / 2592000;
  // if (interval > 1) {
  //   return Math.floor(interval) + " months";
  // }
  let interval = seconds / 86400;
  if (interval > 1) {
    
    return Moment(date).format('MM/DD/YYYY - hh:mm:ss')
    // return Math.floor(interval) + " days";
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
      <div class="col-lg-12 m-b-30">
        <small class="tag-line">
          {" "}
          <i>Transcation List</i>
        </small>
        
      {props.txnRows.length === 0 &&
        <small class="tag-line-error">
          {"No transcation item found"}    
        </small>
      }
      </div>
      <div class="col-lg-12 p0 pull-left smlTxt">
        <div class="col-lg-3 m-t-5 pull-left">
            Transcations
        </div>
        <div class="col-lg-4 pull-left">
            Timestamp (mm/dd/yyyy) UTC
        </div>

        <div class="col-lg-3 m-t-5 pull-left">
            Type
        </div>
        
      </div>
      
      {props.txnRows.sort((a,b) => new Date(a.timestamp) < new Date(b.timestamp) ? 1 : -1).map(
        (row, index) => { return (
             
          <>
           <div class="col-lg-12 p0 pull-left" className={ row.lockStatus  === "DONE" || row.lockStatus === "CLAIM" ? 'col-lg-12 p0 pull-left completed' : row.lockStatus  === "UNLOCK" ? 'col-lg-12 p0 pull-left unlocked' : 'col-lg-12 p0 pull-left locked'}>
                <div class="col-lg-3 m-t-5 pull-left">
                    Amount  {row.lockStatus === "DONE" ? (
                            "completed"
                        ) : row.lockStatus === "UNLOCK" ? (
                            "Unlock MCT"
                        ) : row.lockStatus === "CLAIM" ? (
                            "completed"
                            /*   returnButton(row.timestamp, index) */
                        ) : (
                                "Locked"
                                )}{" "}
                </div>
                <div class="col-lg-4 pull-left">
                    {convertDateTime(row.timestamp)}
                </div>

                <div class="col-lg-3 m-t-5 pull-left">
                    {/* <div class="col-lg-2 p-top5 pull-left"> */}
                        {row.lockStatus === "DONE" ? (
                            "completed"
                        ) : row.lockStatus === "UNLOCK" ? (
                            
                            "Unlocked"
                            
                        ) : row.lockStatus === "CLAIM" ? (
                            "completed"
                            /*   returnButton(row.timestamp, index) */
                        ) : (
                                "Locked"
                                )}{" "}

                    {/* </div> */}
                </div>
                
            </div>
          
          </>
              )
          }
          
        )}
    </div>
  );

}

TranscationList.propTypes = {};

TranscationList.defaultProps = {};

export default TranscationList;
