import React, { useState } from "react";

import { connect } from "react-redux";

import WhiteList from "../../AdminSections/WhiteList/WhiteList";
import Toknomics from "../../AdminSections/Toknomics/Toknomics";
import TokensCirculating from "../../AdminSections/TokensCirculating/TokensCirculating";
import AdminMethods from "../../AdminSections/AdminMethods/AdminMethods";

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
      {page === "circulating" && (
        <>
          <hr class="line"></hr>
          <TokensCirculating />
        </>
      )}
      {page === "method" && (
        <>
          <hr class="line"></hr>
          <AdminMethods />
        </>
      )}
    </>
  );
};

export default connect(null, mapDispatchToProps)(AdminLanding);
