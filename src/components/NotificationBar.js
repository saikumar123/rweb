import React from "react";
import PropTypes from "prop-types";

const NotificationBar = ({ notification }) => (
  <div className="pull-left col-lg-12 tag-line pl-55">{notification}</div>
);

NotificationBar.propTypes = {
  notification: PropTypes.string,
};

NotificationBar.defaultProps = {
  notification: "Notifications from Mandalore Protocol",
};

export default NotificationBar;
