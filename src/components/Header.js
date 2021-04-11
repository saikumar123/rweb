import React from "react";

const Header = () => (
  <div className="header">
    <div className="nav-header">
      <div className="brand-logo">
        <a href="index2.html">
          <img
            src="../assets/images/football.png"
            alt=""
            width="25"
            height="25"
          ></img>
          <span className="brand-title">Football Protocall</span>
        </a>
      </div>
    </div>

    <div className="navbar-custom-menu pull-right d-flex nav-right p-top">
      <button type="button" className="btn button btn-button btn-circular">
        Connect
      </button>
    </div>
  </div>
);

export default Header;
