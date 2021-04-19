import React, { useState } from "react";
// import axios from "axios";
//import { connect } from "react-redux";
// import { create_user, signup_user,login_data } from "../redux/action";
import Error from "./Error";
import LoginService from "../services/LoginService";
//import { useCookies } from 'react-cookie';

import "../assets/css/login.css";

// const mapDispatchToProps = (data) => {
//   console.log("login:mapDispatchToProps", data);
//   return {
//     user_login: (data) => {
//       create_user(data);
//     },
//     signup: (data) => {
//       signup_user(data);
//     },
//     login_data: (data) => {
//       login_data(data);
//     }
//   };
// };

function CustomizedLogin(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  
  // const [lgn_btn_class, setLoginBtnClass] = useState("login_btn");
  const [reg_btn_class, setRegBtnClass] = useState("register_btn");
  const [bottom_line_class, setBottomLineClass] = useState("login_bottom_line");

  const handleLogin = (e) => {
    e.preventDefault();
    //this.setState({ isLoading: "true" });
    //var apiBaseUrl = remote_backend_url;
    // var apiBaseUrl = "http://localhost:3000/";
    //var self = this;
    var payload = {
      username: username,
      email: email,
      password: password,
      accountId: props.accountId,
    };
    setUsernameError("");
    
    if(username.lengh<4 || username.lengh === undefined){
      setUsernameError("Please enter the avtar name greater than 4 character");
      return false
    }
    
    console.log(isLogin);
    console.log(payload);
    if (isLogin === true) {
      console.log('if')
      LoginService.login(payload)
        .then(function (response) {
          // self.setState({ isLoading: "false" });
          console.log(response);
          if (response.status === 200) {
            if(response.data.msg === "User already exists. Please login"){
              setUsernameError("User already exists.");
            }
            if (
              response.data &&
              response.data.msg === "New user. Please Signup"
            ) {
              console.log("New User");
              setErrorMessage("You are new here. Please Signup");
              setIsLogin(false);
              login_btn("register");
              //self.setState({ isRegister: "true" });
              setEmail("");
              setPassword("");
              //self.setState({ email: "" });
              //self.setState({ password: "" });
            } else if (
              response.data &&
              response.data.msg === "Login Successful"
            ) {
              
              props.loginSuccessFull(response.data.payload)
              console.log(response.data.payload.userId);
              console.log("Login successfull");
              setErrorMessage("");
              props.handleLoginClose();
              // props.history.push("/upload");
            }
          } else if (response.data.code === 204) {
            console.log("Username password do not match");
            alert("username password do not match");
          } else {
            setErrorMessage("username does not exist");
            //   self.setState({ errorMessage: "username does not exist" });
            console.log("Username does not exists");
            alert("Username does not exist");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('else')
      // axios
      //   .post("api/api/auth/signup", payload)
      LoginService.signup(payload)
        .then(function (response) {
          // self.setState({ isLoading: "false" });
          console.log(response);
          if (response.status === 201) {
            if (
              response.data &&
              response.data.msg === "User is successfully added"
            ) {
              console.log("user added success");
              
              props.loginSuccessFull(response.data.payload)
              setIsLogin(true);

              props.handleLoginClose(response.data.payload);
              //props.history.push("/upload");
            }
          } else if (response.status === 200) {
            setErrorMessage("This user account already exists. Try Login");
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
      // setLoginBtnClass("login_btn");
      setRegBtnClass("register_btn");
      setBottomLineClass("login_bottom_line");
    } else {
      setIsLogin(false);
      setRegBtnClass("login_btn");
      // setLoginBtnClass("register_btn");
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
      <Error data={errorMessage} />
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
            <form id="login_form" class="col-lg-12">
              <div class="col-lg-12 p0 m-t-15">
                <input
                  type="text"
                  className="form-control form-control-active"
                  value={username}
                  required=""
                  placeholder="Enter your name"
                  onChange={usernameChange}
                />
                <span class="smlTxt">{usernameError !== '' ? usernameError : ''}</span>
              </div>
              {/* <input
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
              /> */}
              <div class="col-lg-12 p0 m-t-15">
                <input
                  type="text"
                  className="form-control form-control-active"
                  value={props.accountId}
                  disabled="disabled"
                  
                />
              </div>
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
      </div>
    </div>
  );
}
// export default connect(null, mapDispatchToProps)(CustomizedLogin);
export default CustomizedLogin;
