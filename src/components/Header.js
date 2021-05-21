import React from "react";

const Header = (props) => {
  const [btnvalue, setBtnvalue] = React.useState("Connect");
  const handleConnect = (type) => {
    props.handleLoginWallet(type);
    setBtnvalue("Connecting...");
  };
  return (
    <div className="header pt-2">
      <div className="nav-header">
        <div className="brand-logo">
          <a href="index2.html">
            <img
              src="../assets/images/football.png"
              alt=""
              width="25"
              height="25"
            ></img>
            <span className="brand-title">Football Protocol</span>
          </a>
        </div>
      </div>

      <div className="navbar-custom-menu pull-right d-flex nav-right p-top">
        {!props.isLogin && (
          <button
            type="button"
            onClick={() => handleConnect("MetaMask")}
            className="btn button btn-button btn-circular"
          >
            {btnvalue}
          </button>
        )}
        {props.isLogin && (
          <button type="button" className="btn button btn-button btn-circular">
            {props.user.avatar}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
