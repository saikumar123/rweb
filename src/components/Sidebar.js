import React, { useState } from "react";

const Sidebar = (props) => {
  const [toggle, setToggle] = useState("collapse");

  const data = [
    {
      label: "Deposit",
      slug: "deposit",
    },
    {
      label: "Escrow",
      slug: "escrow",
    },
    {
      label: "Task List",
      slug: "tasklist",
    },
    {
      label: "Staking",
      slug: "staking",
    },
    {
      label: "Transactions",
      slug: "transactions",
    },
  ];

  return (
    <div className="col-sm-10 nk-sidebar">
      <div className="nk-nav-scroll">
        {/* <ul className="metismenu togg" id="menu">
          <li>
            <a
              className="has-arrow"
              href="javascript:void(0)"
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
        </ul> */}
        {toggle === "collapse" && (
          <ul className="metismenu" id="menu">
            <li className="menu-heading">
              <span className="nav-text smlTxt">User Menu</span>
            </li>
            {data.map((obj) => (
              <li>
                <a
                  href="#"
                  onClick={() => props.handlePage(obj?.slug)}
                  aria-expanded="true"
                  className={props.page === obj?.slug && "active"}
                >
                  <span className="nav-text">{obj?.label}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
