import React, { useState, useMemo } from "react";

const Sidebar = (props) => {
  const [toggle, setToggle] = useState("collapse");

  const userData = [
    {
      label: "Deposit",
      slug: "deposit",
    },
    {
      label: "Staking",
      slug: "staking",
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
      label: "Transactions",
      slug: "transactions",
    },
  ];

  const adminData = [
    {
      label: "WhiteList",
      slug: "whitelist",
    },
    {
      label: "Tokonomics",
      slug: "tokonomics",
    },
    {
      label: "Users",
      slug: "user",
    },
    {
      label: "Tokens Circulating",
      slug: "circulating",
    },
  ];

  const data = useMemo(() => {
    return props?.showAdminPanel ? adminData : userData;
  }, [props?.showAdminPanel]);

  return (
    <div className="col-sm-10 nk-sidebar ">
      <div className="nk-nav-scroll w-100">
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
            {/* <li className="menu-heading">
              <span className="nav-text smlTxt">User Menu</span>
            </li> */}

            {data.map((obj) => (
              <li className={`${obj?.slug === "escrow" && "mt-5"}`}>
                <a
                  href="#"
                  onClick={() => props.handlePage(obj?.slug)}
                  aria-expanded="true"
                  className={props.page === obj?.slug && "active"}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="nav-text">{obj?.label}</div>
                    {obj?.slug === "tasklist" && props?.taskListCount !== 0 && (
                      <div className="nav-count d-flex justify-content-center align-items-center">
                        {props?.taskListCount}
                      </div>
                    )}
                  </div>{" "}
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
