import React, { useState } from "react";
import Error from "./Error";
import LoginService from "../services/LoginService";
import "../assets/css/login.css";

function CustomizedLogin(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [reg_btn_class, setRegBtnClass] = useState("register_btn");
  const [bottom_line_class, setBottomLineClass] = useState("login_bottom_line");

  const handleLogin = (e) => {
    e.preventDefault();
    var payload = {
      username: username,
      email: email,
      password: password,
      accountId: props.accountId,
    };
    if (isLogin === true) {
      LoginService.login(payload)
        .then(function (response) {
          if (response.status === 200) {
            if (
              response.data &&
              response.data.msg === "New user. Please Signup"
            ) {
              setErrorMessage("You are new here. Please Signup");
              setIsLogin(false);
              login_btn("register");
              setEmail("");
              setPassword("");
            } else if (
              response.data &&
              response.data.msg === "Login Successful"
            ) {
              props.loginSuccessFull(response.data.payload);
              setErrorMessage("");
              props.handleLoginClose();
            }
          } else if (response.data.code === 204) {
            alert("username password do not match");
          } else {
            setErrorMessage("username does not exist");
            alert("Username does not exist");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      LoginService.signup(payload)
        .then(function (response) {
          if (response.status === 201) {
            if (
              response.data &&
              response.data.msg === "User is successfully added"
            ) {
              props.loginSuccessFull(response.data.payload);
              setIsLogin(true);
              props.handleLoginClose(response.data.payload);
            }
          } else if (response.status === 200) {
            setErrorMessage("* Avatar name already choosen.");
            login_btn("login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const login_btn = (val) => {
    if (val === "login") {
      setIsLogin(true);
      setRegBtnClass("register_btn");
      setBottomLineClass("login_bottom_line");
    } else {
      setIsLogin(false);
      setRegBtnClass("login_btn");
      setBottomLineClass("reg_bottom_line");
    }
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const usernameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="main">
      <div class="list">
            Choose an avtar name for yourself.<br/>
          - Characters length between 4-15 <br/>
            - Can Contain numbers.

            <br/>- Can Contain letters.

            <br/>
            - No special characters allowed
            <br/>
            </div>
            <div class="text-center p-top p30">
              <input type="text" 
                value={username}
                required=""
                placeholder="Enter your name"
                onChange={usernameChange}
                class="form-control form-control-active"
                />
              {errorMessage !== '' && <span class="text-danger text-left">{errorMessage}</span>}
            </div>
            <div class="text-center"> <button type="button" onClick={handleLogin} class="btn button btn-button btn-circular">Done</button>
              <br/><span class="clrwhite">* note: You will not be allowed to change the avatar name later.</span>
          </div>
      {/* <div class="modal fade top30" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div class="modal-dialog" role="document">
        <div class="modal-content modalNew">
      
          <div class="modal-body">
              <div class="list">
            Choose an avtar name for yourself.<br/>
          - Characters length between 4-15 <br/>
            - Can Contain numbers.
            <br/>- Can Contain letters.
            <br/>
            - No special characters allowed
            <br/>
            </div>
            <div class="text-center p-top p30">
              <input type="text" class="form-control inputWhite" placeholder=""/>
              <span class="text-danger text-left">* Avatar name already choosen.</span>
            </div>
            <div class="text-center"> <button type="button"  class="btn button btn-button btn-circular">Done</button>
              <br/>* note: You will not be allowed to change the avatar name later.
          </div>
          </div>
        
        </div>
      </div>
      </div> */}
      {/* <Error data={errorMessage} />
      <button
        type="button"
        aria-label="Close"
        onClick={() => props.handleLoginClose()}
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
      <div className="logincard">
        <div className="card-title"></div>
        <div className="card-body">
          <div className="card-body-top">
            <button
              id="register"
              className={reg_btn_class}
              onClick={() => login_btn("register")}
              required
            >
              Register
            </button>
            <div id="bottom_line" className={bottom_line_class}></div>
          </div>
          <div className="card-body-bottom">
            <form id="login_form">
              <input
                type="text"
                className="input-field"
                value={username}
                required=""
                placeholder="Enter your name"
                onChange={usernameChange}
              />
              <input
                type="email"
                className="input-field"
                required=""
                value={email}
                placeholder="Enter your email"
                onChange={emailChange}
              />
              <br />
              <br />
              <input
                type="password"
                className="input-field"
                required=""
                value={password}
                placeholder="Enter your password"
                onChange={passwordChange}
              />
              <input
                type="text"
                className="input-field"
                value={props.accountId}
                disabled="disabled"
              />
              <br />
              <br />
              <br />
              <input
                type="submit"
                className="submit-field"
                value="Submit"
                onClick={handleLogin}
              />
            </form>
            <div className="clear"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
// export default connect(null, mapDispatchToProps)(CustomizedLogin);
export default CustomizedLogin;