import React from "react";
import { Button } from "../../../atoms/Button/Button";
import { Loader } from "semantic-ui-react";

const TokensCirculating = (props) => {
  const data = {};
  const Pools = [
    {
      label: "DAI",
      amount: 100,
      apy: "20%",
    },
    {
      label: "USDT",
      amount: 20,
      apy: "30%",
    },
    {
      label: "USDC",
      amount: 20,
      apy: "10%",
    },
    {
      label: "FUSD",
      amount: 30,
      apy: "10%",
    },
    {
      label: "FDL",
      amount: 30,
      apy: "10%",
    },
    {
      label: "FEES",
      amount: 30,
      apy: "10%",
    },
  ];

  return (
    <div className="content-body-padding p-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 m-b-30">
            <div className=" my-4 ">
              <small
                className="tag-line font-weight-bold"
                style={{ fontSize: "20px" }}
              >
                Tokens Circulating
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="tables-section">
        <div className="container-fluid">
          <div className="row">
            {Pools.map((obj) => (
              <div className=" col-5 d-flex align-items-center justify-content-center  m-auto mb-5 blueTxt ">
                <div className="poolCard adminPoolCard">
                  <div className=" text-center label">{obj?.label}</div>

                  {data ? (
                    <>
                      <div className="amount ">
                        <span>Staked Amount:</span> {obj?.amount}
                      </div>
                      {/* <div className="apy ">
                        <span>APY:</span> {obj?.apy}
                      </div> */}
                    </>
                  ) : (
                    <div className="mt-3">
                      <Loader active size="small" inverted inline="centered" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokensCirculating;
