import React, { useState } from "react";

const Sidebar = () => {
  const [toggle, setToggle] = useState("collapse");

  return (
    <div className="nk-sidebar">
      <div className="nk-nav-scroll">
        <ul className="metismenu togg" id="menu">
          <li>
            <a
              className="has-arrow"
              href="#top"
              onClick={() => {
                toggle === "collapse"
                  ? setToggle("collapse.show")
                  : setToggle("collapse");
              }}
              aria-expanded="false"
            >
              <i className="material-icons" style={{ fontSize: "20px" }}>
                toc
              </i>
              <span className="nav-text">Menu</span>
            </a>
            <ul id="options" className={toggle}>
              <li>
                <a href="grid2.html">Voting</a>
              </li>
              <li>
                <a href="buttons2.html">GitHub</a>
              </li>
              <li>
                <a href="tables2.html">Docs</a>
              </li>
              <li>
                <a href="tabs2.html">Discord</a>
              </li>
              <li>
                <a href="forms2.html">Faq</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="metismenu" id="menu">
          <li className="menu-heading">
            <span className="nav-text smlTxt">User Menu</span>
          </li>
          <li>
            <a href="index2.html" aria-expanded="true">
              <span className="nav-text">Deposit</span>
            </a>
          </li>
          <li>
            <a href="trading2.html" aria-expanded="false">
              <span className="nav-text">Escrow</span>
            </a>
          </li>

          <li>
            <a href="marketcap2.html" aria-expanded="false">
              <span className="nav-text">Task List</span>
            </a>
          </li>
          <li>
            <a href="ico2.html" aria-expanded="false">
              <span className="nav-text">Staking</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
