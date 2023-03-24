import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const refSignupEmailError = useRef();
  const refSignupPasswordError = useRef();

  const userNameError = "Error: User not found!";
  const passwordError = "Error: Password is invalid";

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3001/api/v1/user/login",
      withCredentials: false,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        refSignupEmailError.current.innerHTML = "";
        refSignupPasswordError.current.innerHTML = "";
        setToken(res.data.body.token);
        console.log("token = ", token);
      })
      .catch((err) => {
        if (err.response.data.message === userNameError) {
          refSignupEmailError.current.innerHTML = userNameError;
        } else if (err.response.data.message === passwordError) {
          refSignupEmailError.current.innerHTML = "";
          refSignupPasswordError.current.innerHTML = passwordError;
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      <Header />
      <div className="body">
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <div ref={refSignupEmailError} className="errorMessage"></div>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div
                  ref={refSignupPasswordError}
                  className="errorMessage"
                ></div>
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default SignIn;
