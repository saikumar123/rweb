import React from "react";
import PropTypes from "prop-types";

const Comments = ({ statement }) => (
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12 m-b-30">
        <a href="#" class="pull-right">
          <i>{statement}</i>
        </a>
        <hr class="line" />
      </div>
    </div>
  </div>
);

Comments.propTypes = {
  statement: PropTypes.string,
};

Comments.defaultProps = {
  statement: "Protocol Locked Values",
};

export default Comments;
