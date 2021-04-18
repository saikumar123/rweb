import React from "react";
import "../assets/css/style.css";
import "../assets/css/popup.css";
import CustomizedLogin from "./CustomizedLogin";

export default function LoginWalletOptions(props) {

  const handleLoginClose = () => {
    props.handleClose("close");
  }

  return (
    <div className="popup-box">
      <div className="box">
      {/* {!props.isLogin && 
        <div className="ant-modal-content">
          <button
            type="button"
            aria-label="Close"
            onClick={handleLoginClose}
            className="ant-modal-close"
          >
            <span className="ant-modal-close-x">
              <span
                role="img"
                aria-label="close"
                className="anticon anticon-close ant-modal-close-icon"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                </svg>
              </span>
            </span>
          </button>
          <div className="ant-modal-body">
            <p className="styles_headerLabel__2LA1J">Connect Wallet</p>
            <p className="styles_headerNote__2wD65">
              Please select the wallet of your liking
            </p>
            <div className="styles_connectorList__17HDr">
              <button
                type="button"
                onClick={() =>  props.handleClose("MetaMask")}
                className="ant-btn ant-btn-ghost styles_connectorBtn__XttWB"
              >
                <span className="styles_connectorName__2on7g">MetaMask</span>
              </button>
              <button
                type="button"
                onClick={() => props.handleClose("WalletConnect")}
                className="ant-btn ant-btn-ghost styles_connectorBtn__XttWB"
              >
                <span className="styles_connectorName__2on7g">
                  WalletConnect
                </span>
              </button>
              <button
                type="button"
                onClick={() => props.handleClose("WalletConnect")}
                className="ant-btn ant-btn-ghost styles_connectorBtn__XttWB"
              >
                <span className="styles_connectorName__2on7g">Ledger</span>
              </button>
              <button
                type="button"
                onClick={() => props.handleClose("Trezor")}
                className="ant-btn ant-btn-ghost styles_connectorBtn__XttWB"
              >
                <span className="styles_connectorName__2on7g">Trezor</span>
              </button>
              <button
                type="button"
                onClick={() => props.handleClose("Coinbase")}
                className="ant-btn ant-btn-ghost styles_connectorBtn__XttWB"
              >
                <span className="styles_connectorName__2on7g">
                  Coinbase Wallet
                </span>
              </button>
              <button
                type="button"
                onClick={() => props.handleClose("Portis")}
                className="ant-btn ant-btn-ghost styles_connectorBtn__XttWB"
              >
                <span className="styles_connectorName__2on7g">Portis</span>
              </button>
            </div>
          </div>
        
          <div className="ant-modal-footer"></div>
          
        </div>} */}
        
        {props.isLogin  && <CustomizedLogin loginSuccessFull={props.loginSuccessFull}  accountId={props.accountId} handleLoginClose={handleLoginClose}  />}
      </div>
    </div>
  );
}
