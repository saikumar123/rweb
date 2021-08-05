import React from "react";
import dummyProfile from "../assets/image/dummy-profile-image.png";
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
        {/* {props?.isLogin &&
          props.account === "0x943d3C6b97480A3417CcA2b568c85234ef0fF30d" && (
            <button
              type="button"
              onClick={() => props.setShowAdminPanel((val) => !val)}
              className="btn button btn-button btn-circular mr-5"
            >
              {props.showAdminPanel ? "User Panel" : "Admin Panel"}
            </button>
          )} */}

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
                className="btn button btn-button btn-circular avatarSectionButton"
              >
                <div className="avatarSection">
                  <img src={dummyProfile} width="30" height="30" />
                </div>
                <div> {props?.user?.avatar}</div>

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
