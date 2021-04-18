import React from "react";
import PropTypes from "prop-types";
import Comments from "./Comments";
import Deposit from "./Deposit";
import Escrow from "./Escrow";
import TaskList from "./TaskList";
import MyRewards from "./MyRewards";
import LockedValues from "./LockedValues";

const Composite = () => (
  <div class="content-body">
    <Comments />
    <div class="tables-section">
      <div class="container-fluid"></div>
    </div>
  </div>
);

Composite.propTypes = {};

Composite.defaultProps = {};

export default Composite;
