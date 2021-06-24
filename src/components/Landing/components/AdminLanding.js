import React, { useState } from "react";

import { connect } from "react-redux";

import WhiteList from "../../AdminSections/WhiteList/WhiteList";
import Toknomics from "../../AdminSections/Toknomics/Toknomics";

const mapDispatchToProps = (data) => {
  return null;
};

const AdminLanding = ({ page }) => {
  return (
    <>
      {page === "whitelist" && (
        <>
          <hr class="line"></hr>
          <WhiteList />
        </>
      )}
      {page === "tokonomics" && (
        <>
          <hr class="line"></hr>
          <Toknomics />
        </>
      )}
    </>
  );
};

export default connect(null, mapDispatchToProps)(AdminLanding);
