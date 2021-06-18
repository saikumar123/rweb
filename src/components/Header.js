import React from "react";
import LoginService from "../services/LoginService";

const Header = (props) => {
  const [btnvalue, setBtnvalue] = React.useState("Connect");
  const handleConnect = (type) => {
    props.handleLoginWallet(type);
    setBtnvalue("Connecting...");
  };

  const handleLogout = () => {
    LoginService.logout();
  };
  return (
    <div className="header pt-2">
      <div className="nav-header">
        <div className="brand-logo">
          <a href="index2.html" className="align-items-center">
            <img
              src="../assets/images/football.png"
              alt=""
              width="25"
              height="25"
            ></img>
            <span className="brand-title text-white">Football Protocol</span>
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
          <span>
            <div className="headerDropdown">
              <button
                type="button"
                className="btn button btn-button btn-circular"
              >
                {props?.user?.avatar}{" "}
                <i className="fa ml-2 fa-chevron-down "></i>
              </button>

              <div className="headerMenu" onClick={handleLogout}>
                <div className="item">Disconnect</div>
              </div>
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
