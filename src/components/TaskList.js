import React from "react";
import PropTypes from "prop-types";

const TaskList = () => (
  <div class="row m-b-30 blueTxt">
    <div class="col-lg-12 m-b-30">
      <small class="tag-line">
        {" "}
        <i>Task List</i>
      </small>
    </div>
    <div class="col-lg-3">
      Amount
      <br />
      <input type="text" class="form-control" placeholder="" />
    </div>

    <div class="col-lg-3">
      Credited To
      <br />
      <input type="text" class="form-control" placeholder="" />
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
          onChange="rangeSlide(this.value)"
          onmousemove="rangeSlide(this.value)"
        />
      </div>
    </div>
    <div class="col-lg-3 p-top20">
      <button type="button" class="btn button btn-button btn-circular">
        Unlock MCT
      </button>
    </div>
  </div>
);

TaskList.propTypes = {};

TaskList.defaultProps = {};

export default TaskList;
