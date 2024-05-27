import React from "react";
import { useAuth } from "../utils/AuthContext";

const RegisterPage = () => {
  const { user } = useAuth();
  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form action="">
          <div className="field--wrapper">
            <label>Enter email: </label>
            <input
              type="text"
              name="email"
              placeholder="Register your email"
              onChange={(e) => handleInput(e)}
              
            />
          </div>
          <div className="field-wrapper">
            <label>Enter password: </label>
            <input
              type="password"
              name="email"
              placeholder="create password"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="field--wrapper">
            <label>confirm password: </label>
            <input
            type="password"
              name="pass"
              placeholder="confirm password"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="field--wrapper">
            <button className="btn btn--lg btn--main">
             Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
